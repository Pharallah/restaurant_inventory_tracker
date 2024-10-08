#!/usr/bin/env python3

# Standard library imports
from datetime import datetime, timedelta
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from faker_food import FoodProvider

# Local imports
from app import app
from models import db, Item, Supplier, RestockOrder

fake = Faker()
fake.add_provider(FoodProvider)

def random_past_date():
    # Get the current date
    today = datetime.now().date()
    # Generate a random number of days in the past (e.g., up to 1000 days ago)
    days_in_past = randint(1, 90)
    # Subtract that number of days from today
    random_date = today - timedelta(days=days_in_past)

    return random_date

def create_items():
    inventory_items = []
    meat_names = [
    'Chicken Breast', 'Ground Beef', 'Lamb Chops', 'Pork Ribs', 'Turkey Thighs',
    'Beef Steak', 'Pork Belly', 'Chicken Thighs', 'Duck Breast', 'Goat Meat',
    'Veal Cutlets', 'Bison', 'Venison', 'Ham', 'Salami', 'Bacon', 'Sausage'
]
    # food_category = ['Meat', 'Produce', 'Dairy', 'Beverage', 'Equipment']
    for _ in range(10):
        item = Item(
            item_name=rc(meat_names),
            category='Meat',
            stock_quantity=randint(0, 10),
            reorder_quantity=randint(2, 3)
        )
        inventory_items.append(item)

    return inventory_items

def create_suppliers():
    suppliers = []
    for _ in range(3):
        company_name = fake.company()
        email_domain = ''.join(e for e in company_name if e.isalnum() or e == ' ').replace(' ', '-').lower()
        email = f'info@{email_domain}.com'
        
        supplier = Supplier(
            name=company_name,
            email=email,
            phone_num=fake.numerify('###-###-####'),
            address=fake.address()
        )
        suppliers.append(supplier)
    
    return suppliers

def create_orders(items, suppliers):
    orders = []
    status_list = ['Pending', 'Completed', 'Cancelled']
    for _ in range(10):
        order = RestockOrder(
            order_status=rc(status_list),
            order_quantity=randint(0, 10),
            order_date=random_past_date(),
            item_id=rc([item.id for item in items]),
            supplier_id=rc([supplier.id for supplier in suppliers])

        )
        orders.append(order)

    return orders


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Item.query.delete()
        Supplier.query.delete()
        RestockOrder.query.delete()

        print("Seeding Items...")
        items = create_items()
        db.session.add_all(items)
        db.session.commit()

        print("Seeding Suppliers...")
        suppliers = create_suppliers()
        db.session.add_all(suppliers)
        db.session.commit()

        print("Seeding Orders...")
        orders = create_orders(items, suppliers)
        db.session.add_all(orders)
        db.session.commit()

        print("Done Seeding!")