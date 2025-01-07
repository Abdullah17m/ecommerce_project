# **E-Commerce Platform**

This project is a backend application for an e-commerce platform. It provides functionality for user management, product management, cart management, and order processing.

---

## **Features**

### **User Features**
- User Registration and Login
- Update Profile Information
- View Orders and Order Details
- Add Items to Cart
- Place Orders

### **Admin Features**
- Manage Users (Add, Edit, Enable/Disable)
- Manage Products (Add, Update, Delete)
- View All Orders

### **Order Management**
- Checkout: Create an order
- Place Order: Process cart items, update stock, and clear the cart
- View Orders: Retrieve user-specific order history
- Weekly Sales Analysis for the last quarter of 2024
- Product-wise Order Analysis

---

## **API Endpoints**

### **User Management**
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Authenticate a user
- `PUT /api/users/profile`: Update user profile

### **Cart Management**
- `GET /api/cart`: View items in the cart
- `POST /api/cart/add`: Add an item to the cart
- `DELETE /api/cart/remove`: Remove an item from the cart

### **Order Management**
- `POST /api/orders/checkout`: Create an order
- `POST /api/orders/place`: Process an order (reduce stock, clear cart)
- `GET /api/orders`: View all user orders

### **Admin Management**
- `GET /api/admin/users`: View all users
- `POST /api/admin/users`: Add a new user
- `PUT /api/admin/users/:id`: Update user status (enable/disable)
- `GET /api/admin/products`: View all products
- `POST /api/admin/products`: Add a product
- `PUT /api/admin/products/:id`: Update product details
- `DELETE /api/admin/products/:id`: Delete a product

---

## **Database Structure**

### Tables:
1. **Users**
    - `id`, `name`, `email`, `password`, `role`, `status`, `createdAt`

2. **Products**
    - `id`, `name`, `price`, `stock`, `description`, `createdAt`

3. **Cart**
    - `id`, `userId`, `productId`, `quantity`, `createdAt`

4. **Orders**
    - `id`, `userId`, `totalAmount`, `status`, `createdAt`

5. **OrderItems**
    - `id`, `orderId`, `productId`, `quantity`, `price`

---

## **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: MySQL / PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Joi or Express-Validator

---

## **Setup Instructions**

### Prerequisites
- Node.js (v14+)
- MySQL/PostgreSQL
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/e-commerce-platform.git
    cd e-commerce-platform
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure the database:
    - Update `config/database.js` with your database credentials.

4. Run database migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```

5. Start the application:
    ```bash
    npm start
    ```

---

## **SQL Queries**

### 1. User-wise, Product-wise Ordering Quantity with Total Item Value
```sql
SELECT 
    u.name AS user_name, 
    p.name AS product_name, 
    SUM(oi.quantity) AS total_quantity, 
    SUM(oi.quantity * oi.price) AS total_value
FROM 
    Users u
JOIN Orders o ON u.id = o.userId
JOIN OrderItems oi ON o.id = oi.orderId
JOIN Products p ON oi.productId = p.id
GROUP BY u.name, p.name;
```

### 2. Weekly Orders Analysis for the Last Quarter of 2024
```sql
SELECT 
    YEAR(createdAt) AS year, 
    WEEK(createdAt) AS week, 
    COUNT(id) AS order_count
FROM 
    Orders
WHERE 
    createdAt BETWEEN '2024-10-01' AND '2024-12-31'
GROUP BY 
    YEAR(createdAt), WEEK(createdAt);

```

### 3. Product Name and No. of Orders (Exclude Products with Fewer than 5 Orders)
```sql
SELECT 
    p.name AS product_name, 
    COUNT(oi.orderId) AS order_count
FROM 
    Products p
JOIN OrderItems oi ON p.id = oi.productId
GROUP BY p.name
HAVING COUNT(oi.orderId) >= 5;

```