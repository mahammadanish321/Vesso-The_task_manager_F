const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://vesso-the-task-manager-b-3.onrender.com";

export default API_BASE_URL;
