module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    }, { timestamps: false });
    return Order;
};
