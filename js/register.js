import api from "./utils/api.js";
const registerBtn = document.getElementById("Register");
const registerError = document.getElementById("register_error");

if (registerBtn) {
    registerBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        // reset previous error
        if (registerError) {
            registerError.style.display = "none";
            registerError.textContent = "";
        }

        const usernameInput = document.getElementById("username");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        // extra safety: make sure elements exist
        if (!usernameInput || !emailInput || !passwordInput) {
            console.error("One or more input elements not found in DOM.");
            return;
        }

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // front-end validation
        if (!username || !email || !password) {
            if (registerError) {
                registerError.textContent = "All fields are required.";
                registerError.style.display = "block";
            }
            return;
        }

        try {
            const res = await api.post("/api/v1/users/register", { username, email, password });

            // Try to parse JSON once (works for both success + error)
            let data = null;
            try {
                data = await res.json();
            } catch {
                // backend might have sent plain text or empty body
            }

            if (!res.ok) {
                let message = `Registration failed (status ${res.status})`;

                if (data && (data.message || data.error)) {
                    message = data.message || data.error;
                }

                console.error("Register failed:", res.status, message);

                if (registerError) {
                    registerError.textContent = message;
                    registerError.style.display = "block";
                } else {
                    alert(message);
                }
                return;
            }

            console.log("Register success:", data);

            // redirect on success
            window.location.href = "/login.html";

        } catch (err) {
            console.error("Network error:", err);
            if (registerError) {
                registerError.textContent = "Network error. Is the backend running?";
                registerError.style.display = "block";
            } else {
                alert("Network error. Is the backend running?");
            }
        }
    });
} else {
    console.warn('Register button with id="Register" not found.');
}

//done 
