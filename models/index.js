const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Product = require('./Product')(sequelize, Sequelize.DataTypes);
const Cart = require('./Cart')(sequelize, Sequelize.DataTypes);
const Order = require('./Order')(sequelize, Sequelize.DataTypes);
const OrderItem = require('./OrderItem')(sequelize, Sequelize.DataTypes);

// Define relationships
User.hasMany(Cart, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
Product.hasMany(Cart, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { sequelize, User, Product, Cart, Order, OrderItem };
