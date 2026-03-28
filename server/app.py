from flask import request, make_response, session, send_from_directory
from flask_restful import Resource
from config import app, db, bcrypt, migrate, api, os
from models import User, Friendship, Review, Book

@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    return send_from_directory(os.path.join(app.static_folder), 'index.html')

class Users(Resource):

    def get(self):
        
        users = [user.to_dict(rules=('-_password_hash',)) for user in User.query.all()]


        if users:
            return users, 200
        else:
            return {"message": "No Users Found"}, 404


    def post(self):

        data = request.get_json()

        if not data:
            return {"error": "No data provided"}, 400

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"error": "Email and password required"}, 422


        existing_user = User.query.filter_by(email=email).first()

        if existing_user:
            return {"error": "Email already exists"}, 422


        new_user = User(email=email)
        new_user.password_hash = password

        db.session.add(new_user)
        db.session.commit()

api.add_resource(Users, "/users")

class UserById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return  make_response({"message": "User not found"}, 404)

        return make_response({'user': user.to_dict(rules=('-_password_hash',))}, 200)
    
api.add_resource(UserById,'/user/<int:id>' )



# -------------------------
# Create Friendship
# -------------------------
def create_friendship(user_a, user_b):

    friendship = Friendship(
        requestee_id=user_a.id,
        acceptee_id=user_b.id,
        status="pending"
    )

    db.session.add(friendship)
    db.session.commit()

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        print(f"Login attempt for email: {email}")

        user = User.query.filter(User.email == email).first()

        if not user:
            print(f"User email not found: {email}")
            return make_response({'error': 'User Email Not Found'}, 401)
        else:
            print(f"User found: {user.email}")

        if user.authenticate(password):
            session['user_id'] = user.id
            print({session})
            return make_response({'user': user.to_dict(rules=('-_password_hash',))}, 200)
        else:
            print(f"Password mismatch for user {email}")
            return make_response({'error': 'Incorrect password'}, 401)

api.add_resource(Login, "/login")


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message': 'Logged out successfully'}, 200)

api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        print(f"Session contents: {session}")
        user_id = session.get("user_id")
        if not user_id:
            return make_response({"message": "No user currently logged in"}, 401)

        user = User.query.filter(User.id == user_id).first()
        return make_response({'user': user.to_dict(rules=('-_password_hash',))}, 200) if user else make_response({"message": "User not found"}, 404)
        
api.add_resource(CheckSession, "/check_session")
    
if __name__ == "__main__":
    app.run(port=5555, debug=True)