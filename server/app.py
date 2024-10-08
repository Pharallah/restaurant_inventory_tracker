#!/usr/bin/env python3

# Standard library imports

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

api.add_resource(Items, '/items', endpoint='/items')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

