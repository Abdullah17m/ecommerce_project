# **E-Commerce Platform**

This project is a backend application for an e-commerce platform. It provides functionality for user management, product management, cart management, and order processing.

---

## **Features**

### **User Features**
- User Registration and Login
- View Profile Information
- View Orders and Order Details
- Add Items to Cart
- Place Orders



### **Order Management**
- Checkout: Create an order
- Place Order: Process cart items, update stock, and clear the cart
- View Orders: Retrieve user-specific order history


---

## **API Endpoints**

### **User Management**
- `POST /users/register`: Register a new user
- `POST /users/login`: Authenticate a user
- `GET /users/profile`: View user profile

### **Cart Management**
- `GET /cart/view`: View items in the cart
- `POST /cart/add`: Add an item to the cart


### **Order Management**
- `POST /orders/checkout`: Create an order
- `POST /orders/place`: Process an order (reduce stock, clear cart)
- `GET /orders/view`: View all user orders


---

## **Database Structure**

### Tables:
1. **Users**
    - `id`, `name`, `email`, `password`

2. **Products**
    - `id`, `name`, `price`, `stock`

3. **Cart**
    - `id`, `userId`, `productId`, `quantity`

4. **Orders**
    - `id`, `userId`, `totalAmount`,  `createdAt`

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
    git clone https://github.com/Abdullah17m/ecommerce_project
    cd e-commerce-platform
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure the database:
    - Update `config/db.js` with your database credentials.


4. Start the application:
    ```bash
    npm app.js
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