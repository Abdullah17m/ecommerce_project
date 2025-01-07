module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        quantity: { type: DataTypes.INTEGER, allowNull: false },
    }, { timestamps: false });
    return Cart;
};
