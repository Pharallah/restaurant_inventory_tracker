#!/usr/bin/env python3

# Standard library imports
from datetime import datetime

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Item, Supplier, RestockOrder


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Items(Resource):
    def get(self):
        items = [item.to_dict(rules=('-restock_orders',)) for item in Item.query.all()]

        if items:
            response = make_response(
                items, 200
            )
            return response
        else:
            return {'error': 'Unexpected Server Error'}, 500
        
    def post(self):
        json = request.get_json()
        
        try:
            new_item = Item(
            item_name=json['item_name'],
            category=json['category'],
            stock_quantity=json['stock_quantity'],
            reorder_quantity=json['reorder_quantity'],
        )
            db.session.add(new_item)
            db.session.commit()

        except ValueError as e:
            return {'errors': str(e)}, 400
        
        except Exception as e:
            return {'errors': 'Failed to add item to database', 'message': str(e)}, 500
        
        item_in_db = Item.query.filter(
            Item.item_name == json['item_name'],
            Item.category == json['category'],
            Item.stock_quantity == json['stock_quantity'],
            Item.reorder_quantity == json['reorder_quantity']
        ).first()

        item_dict = item_in_db.to_dict(rules=('-restock_orders',))

        if item_dict:
            try:
                return item_dict, 200
            except Exception as e:
                return {'errors': 'Item not found'}, 400
            
class RestockOrders(Resource):
    def get(self):
        restock_orders = [order.to_dict(rules=('-item', '-supplier',)) for order in RestockOrder.query.all()]

        if restock_orders:
            response = make_response(
                restock_orders, 200
            )
            return response
        else:
            return {'error': 'Unexpected Server Error'}, 500
        

    def post(self):
        json = request.get_json()
        today = datetime.now().date()

        try:
            new_order = RestockOrder(
            supplier_id=json['supplier_id'],
            item_id=json['item_id'],
            order_status='Pending',
            order_quantity=json['order_quantity'],
            order_date=today
        )
            db.session.add(new_order)
            db.session.commit()

        except ValueError as e:
            return {'errors': str(e)}, 400
        
        except Exception as e:
            return {'errors': 'Failed to submit order to database', 'message': str(e)}, 500
        
        order_in_db = RestockOrder.query.filter(
            RestockOrder.supplier_id == json['supplier_id'],
            RestockOrder.item_id == json['item_id'],
            RestockOrder.order_status == 'Pending',
            RestockOrder.order_quantity == json['order_quantity'],
            RestockOrder.order_date == today
        ).first()

        order_dict = order_in_db.to_dict(rules=('-item', '-supplier',))

        if order_dict:
            try:
                return order_dict, 200
            except Exception as e:
                return {'errors': 'Restock Order not found'}, 400



api.add_resource(Items, '/items', endpoint='/items')
api.add_resource(RestockOrders, '/restock_orders', endpoint='/restock_orders')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

