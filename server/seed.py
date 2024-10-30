#!/usr/bin/env python3

# Standard library imports
from datetime import datetime, timedelta
from random import randint, choice as rc, sample

# Remote library imports
from faker import Faker
from faker_food import FoodProvider

# Local imports
from app import app
from models import db, Item, Supplier, RestockOrder

fake = Faker()
fake.add_provider(FoodProvider)

def random_past_date():
    today = datetime.now().date()
    random_days_in_past = randint(1, 90)
    # Subtract that number of days from today
    random_date = today - timedelta(days=random_days_in_past)

    return random_date

def create_items():
    inventory_items = []

    # Define category to item mapping
    category_items = {
        "Meat": ['Chicken Breast', 'Ground Beef', 'Pork Ribs', 'Turkey Thighs', 'Pork Belly'],
        "Produce": ['Lettuce', 'Tomato', 'Spinach', 'Carrot', 'Broccoli'],
        "Dairy": ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream'],
        "Beverage": ['Water', 'Soda', 'Juice', 'Tea', 'Coffee'],
        "Spice": ['Salt', 'Pepper', 'Cinnamon', 'Paprika', 'Chili Powder'],
        "Equipment": ['Knife', 'Cutting Board', 'Pan', 'Pot', 'Spatula']
    }

    for category, items in category_items.items():
        # Ensure at least one item per category
        item_name = rc(items)
        new_item = Item(
            item_name=item_name,
            category=category,
            stock_quantity=randint(1, 50),
            reorder_quantity=randint(1, 15)
        )
        inventory_items.append(new_item)

    return inventory_items
            
def generate_company():
    company_name = fake.company()
    return company_name[:20]

companyList = [
    {
        "name": "Restaurant Depot",
        "email": "info@restaurantdepot.com",
        "phone": "216-525-0101",
        "address": "6150 Halle Dr, Valley View, OH 44125"
    },
    {
        "name": "Gordon Food Service",
        "email": "contact@gfs.com",
        "phone": "440-716-6093",
        "address": "24005 Lorain Rd, North Olmsted, OH 44070"
    },
    {
        "name": "Eat Local Ohio",
        "email": "plopez@eatlocalohio.com",
        "phone": "216-361-4625",
        "address": "2699 E 51st St, Cleveland, OH 44115"
    }
]

def create_suppliers():
    suppliers = []

    for company in companyList:
        supplier = Supplier(
            name=company['name'],
            email=company['email'],
            phone_num=company['phone'],
            address=company['address']
        )
        suppliers.append(supplier)
    
    return suppliers

def create_orders(items, suppliers):
    orders = []
    status_list = ['Pending', 'Completed', 'Canceled']
    for _ in range(10):
        order = RestockOrder(
            order_status=rc(status_list),
            order_quantity=randint(1, 10),
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