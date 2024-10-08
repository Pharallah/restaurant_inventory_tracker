from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime

from config import db

# Models go here!

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    item_name= db.Column(db.String, nullable=False, unique=True)
    category = db.Column(db.String, nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    reorder_quantity = db.Column(db.Integer, nullable=False)

    restock_orders = db.relationship('RestockOrder', back_populates='item', cascade='all, delete-orphan')

    serialize_rules = ('-restock_orders.item',)

    @validates('item_name')
    def validates_item_name(self, key, name):
        pass

    @validates('category')
    def validates_category(self, key, category):
        valid_categories = ['Meat', 'Produce', 'Dairy', 'Beverage', 'Spice', 'Equipment']
        if category in valid_categories:
            return category
        else:
            raise ValueError('Must be a valid category')
        


    @validates('stock_quantity')
    def validates_stock_quantity(self, key, quantity):
        pass

    @validates('reorder_quantity')
    def validates_reorder_quantity(self, key, quantity):
        pass

    def __repr__(self):
        return f'<Item {self.id}: {self.item_name}>'


class Supplier(db.Model, SerializerMixin):
    __tablename__ = 'suppliers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False)
    phone_num = db.Column(db.String, nullable=False, unique=True)
    address = db.Column(db.String, nullable=False)

    restock_orders = db.relationship('RestockOrder', back_populates='supplier', cascade='all, delete-orphan')

    serialize_rules = ('-restock_orders.supplier',)

    @validates('name')
    def validates_name(self, key, name):
        pass

    @validates('email')
    def validates_email(self, key, email):
        pass

    @validates('phone_num')
    def validate_phone(self, key, phone_number):
        # Ensure the phone number is in the format 12-length format
        if len(phone_number) != 12 or phone_number[3] != '-' or phone_number[7] != '-':
            raise ValueError('Phone number must be in the format XXX-XXX-XXXX')
        
        # Ensure all other characters are digits
        if not (phone_number[:3].isdigit() and phone_number[4:7].isdigit() and phone_number[8:].isdigit()):
            raise ValueError('Phone number must contain digits in the format XXX-XXX-XXXX')
        
        return phone_number
    
    @validates('address')
    def validates_address(self, key, address):
        pass
    
    def __repr__(self):
        return f'<Supplier {self.id}: {self.name}>'


class RestockOrder(db.Model, SerializerMixin):
    __tablename__ = 'restock_orders'

    id = db.Column(db.Integer, primary_key=True)
    order_status = db.Column(db.String, nullable=False)
    order_quantity = db.Column(db.Integer, nullable=False)
    order_date = db.Column(db.Date, nullable=False)

    supplier_id = db.Column(db.Integer, db.ForeignKey('suppliers.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))

    item = db.relationship('Item', back_populates='restock_orders')
    supplier = db.relationship('Supplier', back_populates='restock_orders')

    serialize_rules = ('-item.restock_orders', '-supplier.restock_orders',)

    @validates('order_status')
    def validate_order_status(self, key, status):
        valid_status = ['Pending', 'Completed', 'Cancelled']

        if status in valid_status:
            return status
        else:
            raise ValueError('Must be a valid status')
        
    @validates('order_quantity')
    def validate_order_quantity(self, key, quantity):
        if quantity > 0:
            return quantity
        else:
            raise ValueError('Must submit quantity above 0')
        
    @validates(order_date)
    def validate_order_date(self, key, date):
        try:
            datetime.strptime(date, '%Y-%m-%d')
        except ValueError as e:
            return {'error': str(e)}


    def __repr__(self):
        return f'<Supplier {self.id}: {self.order_date}>'

    

    # WORK ON VALIDATIONS FOR ALL MODELS
    # THEN WORK ON ALL CRUD OPERATIONS ON APP.PY        