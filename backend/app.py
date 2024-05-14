from config import app, db, stripe
from flask import jsonify, request, make_response, redirect, url_for, session
from models import Course, Student, Admin, Module, Message
import jwt
from functools import wraps
import datetime
from sqlalchemy.exc import IntegrityError

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

    
if __name__ == '__main__':
    app.run(port=5000, debug=True)
