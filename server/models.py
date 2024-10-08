from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    item_name= db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    reorder_quantity = db.Column(db.Integer, nullable=False)


class Supplier(db.Model, SerializerMixin):
    __tablename__ = 'suppliers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False)
    phone_num = db.Column(db.String, nullable=False, unique=True)
    address = db.Column(db.String, nullable=False)

    @validates('phone_num')
    def validate_phone(self, key, phone_number):
        # Ensure the phone number is in the format 12-length format
        if len(phone_number) != 12 or phone_number[3] != '-' or phone_number[7] != '-':
            raise ValueError('Phone number must be in the format XXX-XXX-XXXX')
        
        # Ensure all other characters are digits
        if not (phone_number[:3].isdigit() and phone_number[4:7].isdigit() and phone_number[8:].isdigit()):
            raise ValueError('Phone number must contain digits in the format XXX-XXX-XXXX')
        
        return phone_number


class RestockOrder(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    order_status = db.Column(db.String, nullable=False)
    order_quantity = db.Column(db.Integer, nullable=False)
    order_date = db.Column(db.Date, nullable=False)

    supplier_id = db.Column(db.Integer, db.ForeignKey('suppliers.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))

    # REMINDER:
    # UNABLE TO INITIALIZE DB WITH MODELS. 
    # MIGHT BE DUE TO IMPORTS NOT BEING ABLE TO RESOLVE???