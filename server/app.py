#!/usr/bin/env python3

# Standard library imports
from datetime import datetime

# Remote library imports
from flask import request, make_response, abort
from flask_restful import Resource
from flask_cors import CORS

# Local imports
from config import app, db, api
# Add your model imports
from models import Item, Supplier, RestockOrder

CORS(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Items(Resource):
    def get(self):
        items = [item.to_dict(
            # rules=('-restock_orders',)
            ) for item in Item.query.all()]

        if items:
            response = make_response(
                items, 200
            )
            return response
        else:
            return {'error': 'Unexpected Server Error'}, 500
        
    def post(self):
        json = request.get_json()
        # print(json['itemName'])
        # breakpoint()
        try:
            new_item = Item(
            item_name=json['itemName'],
            category=json['category'],
            stock_quantity=json['stockQuantity'],
            reorder_quantity=json['reorderQuantity'],
        )
            db.session.add(new_item)
            db.session.commit()
        except ValueError as e:
            return {'errors': str(e)}, 400
        
        except Exception as e:
            return {'errors': 'Failed to add item to database', 'message': str(e)}, 500
        
        item_in_db = Item.query.filter(
            Item.item_name == json['itemName'].title(),
            Item.category == json['category'].title(),
            Item.stock_quantity == json['stockQuantity'],
            Item.reorder_quantity == json['reorderQuantity']
        ).first()

        item_dict = item_in_db.to_dict(rules=('-restock_orders',))

        if item_dict:
            try:
                response = make_response(
                    item_dict, 200
                )
                return response
            except Exception as e:
                return {'errors': 'Item not found'}, 400
            
class ItemById(Resource):

    def get(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            abort(404, "Item not found")
        
        return item.to_dict(rules=('-restock_orders',)), 200

    def patch(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            abort(404, "Item not found")

        elif item:
            json = request.get_json()

            errors = []
            if not json.get('itemName'):
                errors.append({'error': 'Must be a valid item name'})
            if not json.get('category'):
                errors.append({'error': 'Must be a valid category'})
            if not json.get('stockQuantity'):
                errors.append({'error': 'Must be a valid stock quantity'})
            if not json.get('reorderQuantity'):
                errors.append({'error': 'Must be a valid reorder quantity'})
            if errors:
                return {'errors': errors}
            
            item.item_name = json['itemName']
            item.category = json['category']
            item.stock_quantity = json['stockQuantity']
            item.reorder_quantity = json['reorderQuantity']

            db.session.commit()

            item_dict = item.to_dict(rules=('-restock_orders',))

            response = make_response(
                item_dict, 202
            )

            return response
    
    def delete(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            abort(404, "Item not found")
  
        db.session.delete(item)
        db.session.commit()
        return {}, 204
      
class Suppliers(Resource):
    def get(self): 
        suppliers = [supplier.to_dict(rules=('-restock_orders',)) for supplier in Supplier.query.all()]
        
        if suppliers:
            response = make_response(
                suppliers, 200
            )
            return response
        else:
            return {'error': 'Unexpected Server Error'}, 500

    def post(self):
        json = request.get_json()

        try:
            new_supplier = Supplier(
                name=json['name'],
                email=json['email'],
                phone_num=json['phone_num'],
                address=json['address']
            )
            
            db.session.add(new_supplier)
            db.session.commit()

        except ValueError as e:
            return {'error': str(e)}, 400
        
        except Exception as e:
            return {'errors': 'Failed to add supplier to database', 'message': str(e)}, 500
        
        supplier_in_db = Supplier.query.filter(
            Supplier.name == json['name'],
            Supplier.email == json['email'],
            Supplier.phone_num == json['phone_num'],
            Supplier.address == json['address']
        ).first()

        supplier_dict = supplier_in_db.to_dict(rules=('-restock_orders',))

        if supplier_in_db:
            try:
                response = make_response(
                    supplier_dict, 200
                )
                return response
            except Exception as e:
                return {'error': 'Supplier not found in database'}, 400

class SupplierById(Resource):
    def get(self, id):
        supplier = Supplier.query.filter(Supplier.id == id)

        if not supplier:
            abort(404, "Item not found")
        
        return supplier.to_dict(rules=('-restock_orders',)), 200
            
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
            supplier_id=json['supplierId'],
            item_id=json['itemId'],
            order_status='Pending',
            order_quantity=json['orderQuantity'],
            order_date=today
        )
            db.session.add(new_order)
            db.session.commit()

        except ValueError as e:
            return {'errors': str(e)}, 400
        
        except Exception as e:
            return {'errors': 'Failed to submit restock order to database', 'message': str(e)}, 500
        
        order_in_db = RestockOrder.query.filter(
            RestockOrder.supplier_id == json['supplierId'],
            RestockOrder.item_id == json['itemId'],
            RestockOrder.order_status == 'Pending',
            RestockOrder.order_quantity == json['orderQuantity'],
            RestockOrder.order_date == today
        ).first()

        order_dict = order_in_db.to_dict(rules=('-item', '-supplier',))

        if order_dict:
            try:
                response = make_response(
                    order_dict, 200
                )
                return response
            except Exception as e:
                return {'errors': 'Restock Order not found'}, 400
    
class RestockOrderById(Resource):

    def get(self, id):
        order = RestockOrder.query.filter(RestockOrder.id == id).first()

        if not order:
            abort(404, "Order not found")
        
        return order.to_dict(rules=('-item', '-supplier')), 200

    def patch(self, id):
        order = RestockOrder.query.filter(RestockOrder.id == id).first()

        if not order:
            abort(404, "Order not found")

        elif order:
            json = request.get_json()

            try:
                order.order_status = json['orderStatus']

                db.session.commit()
            
            except ValueError as e:
                return {'errors': str(e)}, 400

            except Exception as e:
                return {'errors': str(e)}, 500
            
            order_in_db = RestockOrder.query.filter(
                RestockOrder.id == order.id
            ).first()

            order_dict = order_in_db.to_dict(rules=('-item', '-supplier'))

            response = make_response(
                order_dict, 202
            )

            return response
            
    
    def delete(self, id):
        order = RestockOrder.query.filter(RestockOrder.id == id).first()

        if not order:
            abort(404, "Item not found")
  
        db.session.delete(order)
        db.session.commit()

        return {}, 204


api.add_resource(Items, '/items')
api.add_resource(ItemById, '/items/<int:id>')
api.add_resource(Suppliers, '/suppliers')
api.add_resource(RestockOrders, '/restockorders')
api.add_resource(RestockOrderById, '/restockorders/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)



# Do we always have to use make_response() prior to returning our data or can we just use to_dict() and return that?

# Do i still need to run these commands if I already have app.run() within my if __name__ == '__main__':?
    # export FLASK_APP=app.py
    # export FLASK_RUN_PORT=5555