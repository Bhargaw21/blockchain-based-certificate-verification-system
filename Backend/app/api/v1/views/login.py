#!/usr/bin/python3
"""
User login module
"""
from flask import jsonify, request
from app.models.user import User
from app.models.school import School
from app.models import storage
from app.api.v1.views import app_views
from datetime import datetime, timedelta
import jwt
import os

@app_views.route('/login', methods=['POST'])
@app_views.route('/login-admin', methods=['POST'])  # keeping this too if needed
def login():
    # Get the provided email and password from the request
    data = request.get_json()

    # Correct field checking
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Email and Password are required'}), 400

    user_mail = data.get('email')
    password = data.get('password')

    user = storage.get_email(User, user_mail)
    school = storage.get_email(School, user_mail)

    if not user and not school:
        return jsonify({'message': 'Invalid email or password'}), 401

    if user and user.check_password(password):
        try:
            exp_timestamp = datetime.timestamp(datetime.utcnow() + timedelta(days=1))
            token = jwt.encode({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'user_email': user.email,
                'user_id': user.id,
                'role': user.role,
                'exp': exp_timestamp,
            }, os.environ['SECRET_KEY'])
            return jsonify({'token': token})
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500

    if school and school.check_password(password):
        try:
            exp_timestamp = datetime.timestamp(datetime.utcnow() + timedelta(days=1))
            token = jwt.encode({
                'first_name': school.school_name,
                'user_email': school.email,
                'user_id': school.id,
                'role': school.role,
                'exp': exp_timestamp,
            }, os.environ['SECRET_KEY'])
            return jsonify({'token': token})
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500

    return jsonify({'message': 'Invalid email or password'}), 401
