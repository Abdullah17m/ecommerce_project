const { Cart, Product } = require('../models');

// Add to Cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        if (product.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

        const cartItem = await Cart.create({ userId: req.user.id, productId, quantity });
        res.status(201).json(cartItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View Cart
exports.viewCart = async (req, res) => {
    try {
        const cart = await Cart.findAll({
            where: { userId: req.user.id },
            include: { model: Product, attributes: ['name', 'price'] },
        });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
