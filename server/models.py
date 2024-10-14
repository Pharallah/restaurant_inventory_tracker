from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime
from validate_email_address import validate_email

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
        if not name:
            raise ValueError('Must have name')
        if not isinstance(name, str):
            raise ValueError('Item name must be a valid string')
        if len(name) <= 2:
            raise ValueError('Item name must be at least 2 characters long')
        return name.title()

    @validates('category')
    def validates_category(self, key, category):
        titled_category = category.title()
        valid_categories = ['Meat', 'Produce', 'Dairy', 'Beverage', 'Spice', 'Equipment']
        
        if titled_category in valid_categories:
            return titled_category
        else:
            raise ValueError('Must be a valid category.')

    @validates('stock_quantity', 'reorder_quantity')
    def validates_item_quantities(self, key, quantity):
        if quantity is None:
            raise ValueError(f'{key} cannot be None.')
        
        if not isinstance(quantity, int):
            raise ValueError(f'Quantity must be a valid integer.')

        if key == 'stock_quantity' and quantity < 0:
            raise ValueError('Stock quantity must be 0 or higher.')

        if key == 'reorder_quantity' and quantity < 0:
            raise ValueError('Reorder quantity must be 0 or higher.')

        return quantity

    def __repr__(self):
        return f'<Item ID: {self.id}, Item Name: {self.item_name}>'


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
        if name and 1 <= len(name) <= 20:
            return name
        else:
            raise ValueError('Supplier Name must be between 1 and 20 characters long.')

    @validates('email')
    def validates_email(self, key, email):
        if not validate_email(email):
            raise ValueError('Must be a valid email address.')
        return email

    @validates('phone_num')
    def validate_phone(self, key, phone_number):
        # Ensure the phone number is in the format 12-length format
        if len(phone_number) != 12 or phone_number[3] != '-' or phone_number[7] != '-':
            raise ValueError('Phone number must be in the format XXX-XXX-XXXX.')
        
        # Ensure all other characters are digits
        if not (phone_number[:3].isdigit() and phone_number[4:7].isdigit() and phone_number[8:].isdigit()):
            raise ValueError('Phone number must contain digits in the format XXX-XXX-XXXX.')
        
        return phone_number
    
    @validates('address')
    def validates_address(self, key, address):
        if not address:
            raise ValueError('Address cannot be empty.')

        if len(address) < 5 or len(address) > 250:
            raise ValueError('Address must be between 5 and 250 characters.')

        return address
    
    def __repr__(self):
        return f'<Supplier ID: {self.id}, Name: {self.name}>'


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

    @validates('item_id', 'supplier_id')
    def validates_foreign_keys(self, key, id):
        if id is None:
            raise ValueError(f'{key} cannot be None.')
        
        if key == 'item_id':
            item_in_db = Item.query.filter(Item.id == id).first()
            if not item_in_db:
                raise ValueError(f'No item by that ID in database.')
        
        if key == 'supplier_id':
            supplier_in_db = Supplier.query.filter(Supplier.id == id).first()
            if not supplier_in_db:
                raise ValueError(f'No supplier by that ID in database,')
            
        return id

    @validates('order_status')
    def validate_order_status(self, key, status):
        valid_status = ['Pending', 'Completed', 'Cancelled']

        if status in valid_status:
            return status
        else:
            raise ValueError('Must be a valid status.')
        
    @validates('order_quantity')
    def validate_order_quantity(self, key, quantity):
        if quantity > 0:
            return quantity
        else:
            raise ValueError('Order quantity must be above 0.')
        
    @validates(order_date)
    def validate_order_date(self, key, date):
        try:
            datetime.strptime(date, '%m-%d-%Y')
        except ValueError as e:
            return {'error': str(e)}


    def __repr__(self):
        return f'<RestockOrder ID:{self.id}, Order Date: {self.order_date}>'
    