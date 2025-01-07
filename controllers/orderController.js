const { Cart, Order, OrderItem, Product } = require('../models');



// Checkout (Only create order)
exports.checkout = async (req, res) => {
    try {
        const cartItems = await Cart.findAll({ where: { userId: req.user.id }, include: Product });
        if (!cartItems.length) return res.status(400).json({ error: 'Cart is empty' });

        const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.Product.price, 0);

        // Create the order without processing the cart items
        const order = await Order.create({ userId: req.user.id, totalAmount });

        res.status(200).json({ message: 'Order created successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Place Order (Process cart items, update stock, and clear cart)
exports.placeOrder = async (req, res) => {
    try {
        const cartItems = await Cart.findAll({ where: { userId: req.user.id }, include: Product });
        if (!cartItems.length) return res.status(400).json({ error: 'Cart is empty' });

        const order = await Order.findOne({ where: { userId: req.user.id} });
        if (!order) return res.status(400).json({ error: 'Order not found or already processed' });

        // Process cart items, update stock, and create order items
        let totalAmount = 0;
        for (const item of cartItems) {
            totalAmount += item.quantity * item.Product.price;

            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.Product.price,
            });

            // Reduce product stock
            await Product.update(
                { stock: item.Product.stock - item.quantity },
                { where: { id: item.productId } }
            );
        }

        // Update the total amount of the order
        await order.update({ totalAmount });

        // Clear the cart
        await Cart.destroy({ where: { userId: req.user.id } });

        res.status(200).json({ message: 'Order processed successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// View Orders
exports.viewOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: { model: OrderItem, include: { model: Product, attributes: ['name'] } },
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
