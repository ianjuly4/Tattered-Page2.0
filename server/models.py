# server/models.py

from sqlalchemy.orm import validates
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, CheckConstraint, UniqueConstraint
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt


# -------------------------
# User Model
# -------------------------
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ()

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=True, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=True)
    last_name = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=False, unique=True)
    avatar_sheet = db.Column(db.String, nullable=True, default='default-spritesheet.png')
    avatar_frame_index = db.Column(db.Integer, nullable=True, default=0)

    # Relationships
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    sent_requests = db.relationship(
        'Friendship',
        foreign_keys='Friendship.requestee_id',
        back_populates='requestee',
        cascade='all, delete-orphan'
    )
    received_requests = db.relationship(
        'Friendship',
        foreign_keys='Friendship.acceptee_id',
        back_populates='acceptee',
        cascade='all, delete-orphan'
    )

    @property
    def friends(self):
        friends_list = []

        for r in self.sent_requests:
            if r.status == "accepted":
                friends_list.append(r.acceptee)

        for r in self.received_requests:
            if r.status == "accepted":
                friends_list.append(r.requestee)

        return friends_list

    @property
    def pending_requests(self):
        return [r.requestee for r in self.received_requests if r.status == "pending"]

  
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))


    @validates('username')
    def validate_username(self, key, username):
        if username and len(username) < 3:
            raise ValueError("Username must be at least 3 characters")
        return username

    @validates('password_hash')
    def validate_password_hash(self, key, password_hash):
        if not password_hash:
            raise ValueError("Password hash cannot be empty")
        return password_hash


# -------------------------
# Review Model
# -------------------------
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    star_count = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    user = db.relationship('User', back_populates='reviews')
    book = db.relationship('Book', back_populates='reviews')


# -------------------------
# Book Model
# -------------------------
class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    number_of_pages = db.Column(db.Integer, nullable=False)
    progress = db.Column(db.Integer, nullable=False)

    reviews = db.relationship('Review', back_populates='book', cascade='all, delete-orphan')


# -------------------------
# Friendship Model
# -------------------------
class Friendship(db.Model):
    __tablename__ = 'friendships'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, default="pending")  # pending, accepted, rejected
    requestee_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    acceptee_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    requestee = db.relationship("User", foreign_keys=[requestee_id], back_populates="sent_requests")
    acceptee = db.relationship("User", foreign_keys=[acceptee_id], back_populates="received_requests")

    __table_args__ = (
        UniqueConstraint('requestee_id', 'acceptee_id', name='unique_friendship'),
        CheckConstraint('requestee_id != acceptee_id', name='no_self_friendship'),
    )