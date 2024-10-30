# Restaurant Inventory Tracker

Restaurant Inventory Tracker is a full-stack application developed for restaurant owners and managers who want to streamline their stockroom organization. Built using React on the frontend and Flask with SQLAlchemy on the backend, this app provides intuitive features for managing inventory items, suppliers, and restock orders efficiently.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Models](#models)
- [Relationships](#relationships)
- [Database Integrity](#database-integrity)
- [Usage](#usage)
- [Suggested Future Improvements](#suggested-future-improvements)
- [Contributing](#contributing)


---

## Features

1. **Inventory Management**: Add items to the inventory and monitor stock levels.
2. **Supplier Management**: Create and view suppliers and their contact information.
3. **Restock Orders**: 
   - Automatically create restock orders when an item's stock reaches or falls below a defined threshold.
   - Track details of each restock order, including order date, quantity, status, associated item, and supplier.
   - Update restock order status (Pending, Canceled, or Completed) and delete orders if necessary.

## Tech Stack

- **Frontend**: React (with React Router for navigation), Formik and Yup (for form handling and validation)
- **Backend**: Flask (Flask-RESTful for API endpoints)
- **Database**: SQLAlchemy (with Flask-SQLAlchemy as the ORM)

## Models

### 1. `Item`
   - Represents an inventory item with attributes such as item name, category, stock quantity, and restock threshold.

### 2. `Supplier`
   - Represents a supplier with details like name, email, phone number, and a physical address.

### 3. `RestockOrders`
   - Represents restock orders with fields such as order date, quantity, status (Pending, Canceled, or Completed), linked item, and supplier.

## Relationships

- **Item** ↔️ **RestockOrders**: One-to-Many relationship where an item can have multiple restock orders.
- **Supplier** ↔️ **RestockOrders**: One-to-Many relationship where a supplier can have multiple restock orders.
- **Item** ↔️ **Supplier**: Many-to-Many relationship managed through the `RestockOrders` model as the association table.

## Database Integrity

To ensure data integrity and prevent invalid entries:
- **Constraints** and **Validations** were added to protect the database.
- Field-specific constraints were applied, such as unique values where needed and limitations on nullability.
- Form validation with Yup ensures that data integrity is checked both on the frontend and backend.

## Usage

- **Add Inventory Items**: Add new items to the inventory and specify stock quantity and restock thresholds.
- **Manage Suppliers**: Add new suppliers or update supplier details as necessary.
- **Create Restock Orders**: When an item’s stock falls below or at its restock threshold, create a new restock order with a supplier. Track and update the status of each order as it progresses.

**Form Handling**

Formik is used to handle form submission, while Yup is used for schema-based validation, ensuring consistent and reliable input management for user actions across the app.

## Suggested Future Improvements

- Implement authentication for user access control.
- Add reporting and analytics for inventory usage patterns.
- Integrate a notification system for low-stock alerts.
- Filter functionality for all models (Items, Suppliers, and Restock Orders) to optimize organizational efficiency.
- Include full CRUD actions for all models.

## Contributing

All contributions are welcome! Feel free to open issues or submit pull requests.