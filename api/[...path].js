export default async function handler(req, res) {
    const backendUrl = 'https://vesso-the-task-manager-b-3.onrender.com';
    const url = backendUrl + req.url;

    try {
        const response = await fetch(url, {
            method: req.method,
            headers: {
                ...req.headers,
                host: new URL(backendUrl).host,
            },
            body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
        });

        res.status(response.status);

        // Forward all headers from backend response
        for (const [key, value] of response.headers) {
            res.setHeader(key, value);
        }

        const body = await response.text();
        res.send(body);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('Proxy error');
    }
}