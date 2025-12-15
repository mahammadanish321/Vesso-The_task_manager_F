const loginBtn = document.getElementById("login");
const loginError = document.getElementById("login_error");

if (!loginBtn) {
  console.warn('Login button with id="login" not found.');
} else {
  loginBtn.addEventListener("click", handleLogin);
}

async function handleLogin(e) {
  e.preventDefault();

  clearError();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!emailInput || !passwordInput) {
    console.error("Email or password input not found in DOM.");
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showError("Email and password are required.");
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/v1/users/login", {
      method: "POST",
      credentials: "include", // 🔥 required for cookie-based auth
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await safeParseJSON(res);

    if (!res.ok) {
      const message =
        data?.message ||
        data?.error ||
        `Login failed (status ${res.status})`;

      showError(message);
      return;
    }

    console.log("Login successful:", data);

    // small delay avoids cookie race condition in some browsers
    setTimeout(() => {
      window.location.href = "/pages/index.html";
    }, 100);

  } catch (error) {
    console.error("Network error during login:", error);
    showError("Network error. Please check if the backend is running.");
  }
}

//Helper functions

function showError(message) {
  if (loginError) {
    loginError.textContent = message;
    loginError.style.display = "block";
  } else {
    alert(message);
  }
}

function clearError() {
  if (loginError) {
    loginError.textContent = "";
    loginError.style.display = "none";
  }
}

async function safeParseJSON(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

//done 