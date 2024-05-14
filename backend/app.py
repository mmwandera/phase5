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

# Login route
@app.route('/login', methods=['POST'])
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


if __name__ == '__main__':
    app.run(port=5000, debug=True)
