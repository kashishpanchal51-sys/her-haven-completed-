const http = require('http');
const url = require('url');
const { handleAuthRoutes } = require('./src/routes/authRoutes');
const { handleProductRoutes } = require('./src/routes/productRoutes');
const { handleCartRoutes } = require('./src/routes/cartRoutes');

const PORT = process.env.PORT || 5000;

function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
}

const server = http.createServer((req, res) => {
    // 1. Set CORS Headers
    setCorsHeaders(res);

    // 2. Handle CORS Preflight OPTIONS Request
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // 3. Parse Request URL & Query Parameters
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const queryParams = new URLSearchParams(parsedUrl.search || '');

    // 4. Collect JSON Body (for POST / PUT requests)
    let rawBody = '';
    req.on('data', chunk => {
        rawBody += chunk.toString();
    });

    req.on('end', () => {
        let body = null;
        if (rawBody) {
            try {
                body = JSON.parse(rawBody);
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
            }
        }

        console.log(`[API REQUEST] ${req.method} ${pathName}`);

        // 5. Health Check Endpoint
        if (req.method === 'GET' && (pathName === '/' || pathName === '/api/health')) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                status: 'online',
                app: 'Her Haven — Luxury Boutique & Salon REST API',
                version: '1.0.0',
                time: new Date().toISOString()
            }));
        }

        // 6. Route Dispatching
        if (handleAuthRoutes(req, res, pathName, body)) return;
        if (handleProductRoutes(req, res, pathName, queryParams)) return;
        if (handleCartRoutes(req, res, pathName, body)) return;

        // 7. 404 Route Not Found
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: `Endpoint '${pathName}' not found` }));
    });
});

server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`✨ Her Haven Backend REST API is running!`);
    console.log(`🌐 Server Address: http://localhost:${PORT}`);
    console.log(`📌 Health Check:   http://localhost:${PORT}/api/health`);
    console.log(`🛍️ Products API:   http://localhost:${PORT}/api/products`);
    console.log(`🔑 Auth API:       http://localhost:${PORT}/api/auth/login`);
    console.log(`🛒 Cart API:       http://localhost:${PORT}/api/cart`);
    console.log(`=======================================================`);
});
