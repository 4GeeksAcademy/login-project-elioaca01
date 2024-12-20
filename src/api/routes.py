"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import os
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def register():
    try:
        body = request.json
        name = body.get('name')
        email = body.get('email')
        password = body.get('password')

        if name is None or email is None or password is None:
            return jsonify('all three fields are required'), 400
        else:
            user = User()
            user_exist= user.query.filter_by(email=email).first()

            if user_exist is not None:
                return jsonify("User exist"), 400
            
            salt = b64encode(os.urandom(32)).decode('utf-8') 
            password = generate_password_hash(f'{password}{salt}')

            user.name = name
            user.email = email
            user.password = password
            user.is_active = False
            user.salt = salt
            db.session.add(user)
            
            try:
                db.session.commit()
                return jsonify("created user"), 201
            except Exception as error:
                print(error.args)
                return jsonify(error.args),500
    except Exception as error:
        print(error.args)
        return jsonify(error.args), 500


@api.route('/login', methods=['POST'])
def login():
    try:
        body = request.json
        email = body.get('email')
        password = body.get('password')

        if email is None or password is None:
            return jsonify('all two fields are required'), 400
        else:
            user = User.query.filter_by(email=email).first()
            
            if user is None:
                return jsonify('user not found'),404
            else:
                if check_password_hash(user.password,f'{password}{user.salt}'):
                    token = create_access_token(identity=str(user.id))
                    return jsonify({"token":token,"current_user":user.serialize()}),200
                else:
                    return jsonify("wrong credentials"),400

    except Exception as error:
        return jsonify(error.args),500


