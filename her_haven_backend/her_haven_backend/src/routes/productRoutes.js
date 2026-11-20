const { loadDB } = require('../db');

function handleProductRoutes(req, res, pathName, queryParams) {
    // GET /api/products
    if (req.method === 'GET' && pathName === '/api/products') {
        const db = loadDB();
        let products = db.products || [];

        // Category filter
        const category = queryParams.get('category');
        if (category && category !== 'all') {
            products = products.filter(p => p.category === category);
        }

        // Search query filter
        const search = queryParams.get('search');
        if (search && search.trim()) {
            const q = search.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.subtitle.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            );
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            count: products.length,
            products
        }));
    }

    // GET /api/products/:id
    if (req.method === 'GET' && pathName.startsWith('/api/products/')) {
        const productId = pathName.replace('/api/products/', '');
        const db = loadDB();
        const product = (db.products || []).find(p => p.id === productId);

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Product with ID '${productId}' not found` }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ product }));
    }

    return false; // Route not matched
}

module.exports = { handleProductRoutes };
