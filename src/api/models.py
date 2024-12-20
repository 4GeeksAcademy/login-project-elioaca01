from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    salt = db.Column(db.String(120), nullable=False)
    create_at = db.Column(db.DateTime(timezone=True), default=db.func.now(), nullable=False)
    update_at = db.Column(db.DateTime(timezone=True), default=db.func.now(),onupdate=db.func.now(), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name":self.name,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }