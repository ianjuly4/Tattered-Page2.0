from flask import Flask, render_template, request, make_response, session, send_from_directory, jsonify
from flask_restful import Api, Resource
from config import app, db, bcrypt, migrate, api, os
from models import User, Chatroom, Friend, Review, Book
from datetime import datetime
import ipdb

@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    return send_from_directory(os.path.join(app.static_folder), 'index.html')

class Users(Resource):
    def get(self):
        user_dict_list = [user.to_dict() for user in User.query.all()]
        if user_dict_list:
            return user_dict_list, 200
        else:
            return {"message": "No Users Found"}, 400
    def post(self):
        data = request.get_json()

        if not data:
            return make_response({"message"})

api.add_resource(Users, '/users')
if __name__ == '__main__':
    app.run(port=5555, debug=True)