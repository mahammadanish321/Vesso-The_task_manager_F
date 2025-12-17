import API_BASE_URL from "../config.js";

/**
 * Common configuration for all requests
 */
const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
};

/**
 * Helper to standardise all API requests.
 * Automatically adds:
 * - Base URL
 * - Credentials (cookies)
 * - Headers (for JSON)
 */
async function request(endpoint, { method = "GET", body, headers = {} } = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
        method,
        headers: {
            ...DEFAULT_HEADERS,
            ...headers,
        },
        credentials: "include", // 🔥 Crucial for cross-site cookies
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    // If it's a GET request, we typically don't send a body or Content-Type (though fetch ignores body on GET)
    if (method === "GET") {
        delete config.body;
        //  delete config.headers["Content-Type"]; // Optional: some backends might prefer not to see this on GET, but usually harmless
    }

    // console.log(`[API] ${method} ${url}`, body || "");

    try {
        const res = await fetch(url, config);
        return res;
    } catch (error) {
        console.error(`[API] Network Error ${method} ${url}`, error);
        throw error;
    }
}

// Convenience methods
const api = {
    get: (endpoint, headers) => request(endpoint, { method: "GET", headers }),
    post: (endpoint, body, headers) => request(endpoint, { method: "POST", body, headers }),
    patch: (endpoint, body, headers) => request(endpoint, { method: "PATCH", body, headers }),
    del: (endpoint, body, headers) => request(endpoint, { method: "DELETE", body, headers }),
    // generic request if needed
    request,
};

export default api;
