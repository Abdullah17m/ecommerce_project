const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('ecom_db', 'root', process.env.pass, {
    host: 'localhost',
    dialect: 'mysql',
    logging:false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
