import api from "./utils/api.js";
const logoutBtn = document.getElementById("log_out");

if (!logoutBtn) {
  console.warn('Logout button with id="log_out" not found.');
} else {
  logoutBtn.addEventListener("click", handleLogout);
}

async function handleLogout(e) {
  e.preventDefault();

  try {
    const res = await api.post("/api/v1/users/logout");

    // Successful logout OR already logged out
    if (res.ok || res.status === 401 || res.status === 403) {
      redirectToLogin();
      return;
    }

    // Unexpected server response
    const message = await res.text().catch(() => "");
    console.error("Logout failed:", res.status, message);
    alert("Logout failed. Please try again.");

  } catch (error) {
    console.error("Network error during logout:", error);
    alert("Network error. Please check your connection or backend server.");
  }
}

function redirectToLogin() {
  // do NOT rely on document.cookie for auth (HttpOnly cookies are invisible)
  window.location.href = "/index.html";
}
//done