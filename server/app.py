from flask import request, make_response, session, send_from_directory
from flask_restful import Resource
from config import app, db, bcrypt, migrate, api, os
from models import User, Friendship, Review, Book

import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


# -------------------------
# React Frontend Route
# -------------------------
@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    return send_from_directory(os.path.join(app.static_folder), 'index.html')


# -------------------------
# Email Sender
# -------------------------
def send_verification_email(user_email, token):

    sender_email = os.getenv("EMAIL_USER")
    sender_password = os.getenv("EMAIL_PASS")

    verification_link = f"http://localhost:5555/verify/{token}"

    subject = "Verify Your Email"

    body = f"""
Welcome to Tattered Page!

Please verify your account by clicking the link below:

{verification_link}

If you didn't create an account, ignore this email.
"""

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = user_email
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, user_email, msg.as_string())


# -------------------------
# Users Resource
# -------------------------
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


        # generate verification token
        token = str(uuid.uuid4())

        new_user = User(
            email=email,
            verification_token=token,
            is_verified=False
        )

        new_user.password_hash = password

        db.session.add(new_user)
        db.session.commit()

        # send verification email
        try:
            send_verification_email(email, token)
            print("Verification email sent successfully.")
        except Exception as e:
            print("EMAIL ERROR:", e)

        return {
            "message": "Account created. Check your email to verify."
}, 201


api.add_resource(Users, "/users")


# -------------------------
# Email Verification Route
# -------------------------
@app.route("/verify/<token>")
def verify_email(token):

    user = User.query.filter_by(verification_token=token).first()

    if not user:
        return {"error": "Invalid verification token"}, 400

    user.is_verified = True
    user.verification_token = None

    db.session.commit()

    return {"message": "Email verified successfully!"}


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
    
if __name__ == "__main__":
    app.run(port=5555, debug=True)