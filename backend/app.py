from config import app, db, stripe
from flask import jsonify, request, make_response, redirect, url_for, session
from models import Course, Student, Admin
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


if __name__ == '__main__':
    app.run(port=5000, debug=True)
