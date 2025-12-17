const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : ""; // Empty string = same origin (vercel.app) -> hits proxy

export default API_BASE_URL;
