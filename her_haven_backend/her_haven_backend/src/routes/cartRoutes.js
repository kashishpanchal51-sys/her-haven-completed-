const { loadDB, saveDB } = require('../db');
const { getAuthUser } = require('../auth');

function getCartSummary(userId, db) {
    const userCart = db.carts[userId] || { items: [], appliedCoupon: null };
    const products = db.products || [];

    let subtotal = 0;
    const enrichedItems = userCart.items.map(item => {
        const prod = products.find(p => p.id === item.productId);
        const itemPrice = item.price || (prod ? prod.price : 0);
        const lineTotal = itemPrice * item.quantity;
        subtotal += lineTotal;

        return {
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            size: item.size || 'Standard',
            color: item.color,
            price: itemPrice,
            lineTotal,
            product: prod ? {
                id: prod.id,
                name: prod.name,
                category: prod.category,
                image: prod.image,
                subtitle: prod.subtitle
            } : null
        };
    });

    let discount = 0;
    if (userCart.appliedCoupon && db.coupons[userCart.appliedCoupon]) {
        const coupon = db.coupons[userCart.appliedCoupon];
        discount = Math.round(subtotal * (coupon.discountPercent / 100));
    }

    const total = Math.max(0, subtotal - discount);
    const TIER_GOAL = 15000;
    const freeShippingProgress = Math.min(100, Math.round((subtotal / TIER_GOAL) * 100));
    const amountNeededForFreeTier = Math.max(0, TIER_GOAL - subtotal);

    return {
        items: enrichedItems,
        itemCount: enrichedItems.reduce((acc, i) => acc + i.quantity, 0),
        subtotal,
        discount,
        appliedCoupon: userCart.appliedCoupon,
        total,
        freeShippingProgress,
        amountNeededForFreeTier
    };
}

function handleCartRoutes(req, res, pathName, body) {
    // Authenticate user for all cart actions
    const user = getAuthUser(req);

    // If no auth token provided, default to demo user "usr_priya" so frontend can query cart seamlessly!
    const userId = user ? user.id : 'usr_priya';

    // GET /api/cart
    if (req.method === 'GET' && pathName === '/api/cart') {
        const db = loadDB();
        const summary = getCartSummary(userId, db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(summary));
    }

    // POST /api/cart/add
    if (req.method === 'POST' && pathName === '/api/cart/add') {
        const { productId, quantity = 1, size, color } = body || {};
        if (!productId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'productId is required' }));
        }

        const db = loadDB();
        const product = (db.products || []).find(p => p.id === productId);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Product '${productId}' not found` }));
        }

        if (!db.carts[userId]) {
            db.carts[userId] = { items: [], appliedCoupon: 'HAVEN10' };
        }

        const userCart = db.carts[userId];
        const existingItem = userCart.items.find(i => i.productId === productId && (!size || i.size === size));

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = {
                id: 'item_' + Date.now(),
                productId,
                quantity,
                size: size || 'Standard',
                color: color || 'Standard',
                price: product.price
            };
            userCart.items.push(newItem);
        }

        saveDB(db);

        const summary = getCartSummary(userId, db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            message: `Added "${product.name}" to cart`,
            cart: summary
        }));
    }

    // PUT /api/cart/items/:id (update quantity)
    if (req.method === 'PUT' && pathName.startsWith('/api/cart/items/')) {
        const itemId = pathName.replace('/api/cart/items/', '');
        const { delta, quantity } = body || {};

        const db = loadDB();
        const userCart = db.carts[userId];
        if (!userCart) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Cart is empty' }));
        }

        const item = userCart.items.find(i => i.id === itemId);
        if (!item) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Cart item '${itemId}' not found` }));
        }

        if (typeof quantity === 'number') {
            item.quantity = quantity;
        } else if (typeof delta === 'number') {
            item.quantity += delta;
        }

        if (item.quantity <= 0) {
            userCart.items = userCart.items.filter(i => i.id !== itemId);
        }

        saveDB(db);

        const summary = getCartSummary(userId, db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Cart item updated', cart: summary }));
    }

    // DELETE /api/cart/items/:id (remove item)
    if (req.method === 'DELETE' && pathName.startsWith('/api/cart/items/')) {
        const itemId = pathName.replace('/api/cart/items/', '');
        const db = loadDB();

        if (db.carts[userId]) {
            db.carts[userId].items = db.carts[userId].items.filter(i => i.id !== itemId);
            saveDB(db);
        }

        const summary = getCartSummary(userId, db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Item removed from cart', cart: summary }));
    }

    // POST /api/cart/coupon
    if (req.method === 'POST' && pathName === '/api/cart/coupon') {
        const { code } = body || {};
        if (!code) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Coupon code is required' }));
        }

        const trimmed = code.trim().toUpperCase();
        const db = loadDB();

        if (!db.coupons[trimmed]) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Invalid privilege code '${trimmed}'. Try HAVEN10` }));
        }

        if (!db.carts[userId]) {
            db.carts[userId] = { items: [], appliedCoupon: null };
        }

        db.carts[userId].appliedCoupon = trimmed;
        saveDB(db);

        const summary = getCartSummary(userId, db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            message: `Coupon '${trimmed}' applied successfully!`,
            cart: summary
        }));
    }

    // DELETE /api/cart (clear cart / checkout)
    if (req.method === 'DELETE' && pathName === '/api/cart') {
        const db = loadDB();
        if (db.carts[userId]) {
            db.carts[userId].items = [];
            saveDB(db);
        }

        const summary = getCartSummary(userId, db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Cart cleared successfully', cart: summary }));
    }

    return false; // Route not matched
}

module.exports = { handleCartRoutes };
