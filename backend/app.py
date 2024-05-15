from config import app, db, stripe
from flask import jsonify, request, make_response, redirect, url_for, session
from models import Course, Student, Admin, Module, Message
import jwt
from functools import wraps
import datetime
from sqlalchemy.exc import IntegrityError
import logging

# Routes

# student signup
@app.route('/signup', methods=['POST'])
def signup():
    # Get data from the request
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    # Check if email or username already exists
    if Student.query.filter_by(email=email).first() or Student.query.filter_by(username=username).first():
        return jsonify({'message': 'Email or username already exists'}), 400

    # Create a new student instance
    new_student = Student(email=email, username=username, password_hash=password)

    # Add the new student to the database
    db.session.add(new_student)
    db.session.commit()

    return jsonify({'message': 'User signed up successfully'}), 201

# Student Login route
@app.route('/student-login', methods=['POST'])
def login():
    # Get data from the request
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the student by email
    student = Student.query.filter_by(email=email).first()

    # Check if the student exists and if the password is correct
    if student and student.authenticate(password):
        # Store the student's ID in the session
        session['student_id'] = student.id
        return jsonify({'message': 'Login successful', 'student_id': student.id}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

# Admin Login route
@app.route('/admin-login', methods=['POST'])
def admin_login():
    # Get data from the request
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the admin by email
    admin = Admin.query.filter_by(email=email).first()

    # Check if the admin exists and if the password is correct
    if admin and admin.authenticate(password):
        # Return success message along with admin ID
        return jsonify({'message': 'Admin login successful', 'admin_id': admin.id}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401
    
# Route to add a new admin
@app.route('/add-admin', methods=['POST'])
def add_admin():
    # Get data from the request
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Create a new admin instance
    new_admin = Admin(name=name, email=email, password_hash=password)

    # Add the new admin to the database
    db.session.add(new_admin)
    db.session.commit()

    # Return a success message
    return jsonify({'message': 'Admin added successfully'}), 201

# Route to get all admins   
@app.route('/get-admins', methods=['GET'])
def get_admins():
    try:
        admins = Admin.query.all()
        admins_list = [{'id': admin.id, 'name': admin.name, 'email': admin.email, } for admin in admins]
        return jsonify(admins_list), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching admins', 'error': str(e)}), 500
    
# Route for deleting admin
@app.route('/delete-admin/<int:admin_id>', methods=['DELETE'])
def delete_admin(admin_id):
    try:
        admin = Admin.query.get(admin_id)
        if admin:
            db.session.delete(admin)
            db.session.commit()
            return jsonify({'message': 'Admin deleted successfully'}), 200
        else:
            return jsonify({'message': 'Admin not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error deleting admin', 'error': str(e)}), 500

# Route for adding New Course
@app.route('/add-course', methods=['POST'])
def add_course():
    data = request.get_json()

    # Extract admin ID from the request, assuming it's sent in the request body
    admin_id = data.get('admin_id')
    admin = Admin.query.get(admin_id)
    if not admin:
        return jsonify({'message': 'Admin not found'}), 404

    # Extract course details
    title = data.get('title')
    description = data.get('description')
    thumbnail = data.get('thumbnail')
    price = data.get('price')

    # Create a new Course instance
    new_course = Course(title=title, description=description, thumbnail=thumbnail, price=price, admin_id=admin.id)

    # Add the new course to the session
    db.session.add(new_course)
    db.session.commit()

    # Now, add modules for this course
    modules = data.get('modules')  # Expecting modules to be a list of dictionaries
    for module_data in modules:
        new_module = Module(
            title=module_data['title'],
            media=module_data['media'],
            notes=module_data['notes'],
            course_id=new_course.id  # Use the ID of the newly created course
        )
        db.session.add(new_module)

    # Commit the session to save modules
    db.session.commit()

    return jsonify({'message': 'Course and modules added successfully', 'course_id': new_course.id}), 201

# Route to fetch all courses
@app.route('/courses', methods=['GET'])
def get_courses():
    try:
        courses = Course.query.all()
        courses_list = [{
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'thumbnail': course.thumbnail,
            'price': course.price,
            'modules': len(course.modules)  # Return the count of modules
        } for course in courses]
        return jsonify({'courses': courses_list}), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching courses', 'error': str(e)}), 500

# Route for creating a Stripe Checkout Session
@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.get_json()
        course_id = data.get('course_id')
        student_id = data.get('student_id')
        course = Course.query.get(course_id)
        student = Student.query.get(student_id)

        if not course:
            return jsonify({'message': 'Course not found'}), 404

        if not student:
            return jsonify({'message': 'Student not found'}), 404

        # Create a new Stripe Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': course.title,
                        'description': course.description,
                    },
                    'unit_amount': int(course.price * 100),  # Stripe expects the amount in cents
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:5173/my-courses',  # Update with your success URL
            cancel_url='http://localhost:5137/',    # Update with your cancel URL
        )

        # Add the course to the student's courses
        student.courses.append(course)
        db.session.commit()

        return jsonify({'url': session.url})
    except Exception as e:
        return jsonify({'message': 'Error creating checkout session', 'error': str(e)}), 500


# Route to Fetch User's Courses
@app.route('/student-courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    try:
        student = Student.query.get(student_id)
        if not student:
            return jsonify({'message': 'Student not found'}), 404

        courses = student.courses
        courses_list = [{
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'thumbnail': course.thumbnail,
            'price': course.price,
            'modules': len(course.modules)  # Return the count of modules
        } for course in courses]

        return jsonify({'courses': courses_list}), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching student courses', 'error': str(e)}), 500


@app.route('/course/<int:course_id>', methods=['GET'])
def get_course(course_id):
    try:
        course = Course.query.get(course_id)
        if not course:
            return jsonify({'message': 'Course not found'}), 404

        course_data = {
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'thumbnail': course.thumbnail,
            'price': course.price,
            'modules': [{
                'id': module.id,
                'title': module.title,
                'media': module.media,
                'notes': module.notes
            } for module in course.modules]
        }

        return jsonify(course_data), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching course', 'error': str(e)}), 500

# Route to get user details
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = Student.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching user details', 'error': str(e)}), 500

# Route to get user messages
@app.route('/messages/<int:user_id>', methods=['GET'])
def get_messages(user_id):
    try:
        messages = Message.query.filter_by(student_id=user_id).all()
        messages_list = [{'id': message.id, 'title': message.title, 'content': message.content} for message in messages]
        return jsonify(messages_list), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching messages', 'error': str(e)}), 500

# Route to delete user messages
@app.route('/delete-message/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    try:
        message = Message.query.get(message_id)
        if not message:
            return jsonify({'message': 'Message not found'}), 404

        db.session.delete(message)
        db.session.commit()
        return jsonify({'message': 'Message deleted successfully'}), 200
    except Exception as e:
        app.logger.error(f'Error deleting message {message_id}: {e}')
        return jsonify({'message': 'Error deleting message', 'error': str(e)}), 500

# Route for sending messages
@app.route('/send-message/<int:student_id>', methods=['POST'])
def send_message(student_id):
    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')

        # Validate student_id
        if not student_id:
            return jsonify({'message': 'Invalid student ID'}), 400

        # Use Session.get() instead of Query.get()
        student = db.session.get(Student, student_id)
        if not student:
            return jsonify({'message': 'Student not found'}), 404

        new_message = Message(student_id=student_id, title=title, content=content)
        db.session.add(new_message)
        db.session.commit()

        return jsonify({'message': 'Message sent successfully'}), 201
    except Exception as e:
        app.logger.error(f'Error sending message: {e}')
        return jsonify({'message': 'Error sending message', 'error': str(e)}), 500


# Route to get all students 
@app.route('/get-students', methods=['GET'])
def get_students():
    try:
        students = Student.query.all()
        student_list = [{'id': student.id, 'username': student.username, 'email': student.email} for student in students]
        return jsonify(student_list), 200
    except Exception as e:
        app.logger.error(f'Error fetching students: {e}')
        return jsonify({'message': 'Error fetching students', 'error': str(e)}), 500
    
# Route to fetch all courses
@app.route('/admin-course', methods=['GET'])
def get_all_courses_for_admin():
    try:
        courses = Course.query.all()
        courses_list = [{
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'thumbnail': course.thumbnail,
            'price': course.price
        } for course in courses]
        return jsonify({'courses': courses_list}), 200
    except Exception as e:
        logging.error(f"Error fetching courses: {e}")
        return jsonify({'message': 'Error fetching courses', 'error': str(e)}), 500
    
# Route to delete a course
@app.route('/admin-course/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    try:
        course = Course.query.get(course_id)
        if not course:
            return jsonify({'message': 'Course not found'}), 404
        
        # Delete associated modules
        Module.query.filter_by(course_id=course_id).delete()
        
        db.session.delete(course)
        db.session.commit()
        
        return jsonify({'message': 'Course and its modules deleted successfully'}), 200
    except Exception as e:
        logging.error(f"Error deleting course: {e}")
        return jsonify({'message': 'Error deleting course', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
