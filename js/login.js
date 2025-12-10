// // js/user.call.js

// const loginBtn = document.getElementById("login");
// const loginError = document.getElementById("login_error");

// if (loginBtn) {
//     loginBtn.addEventListener("click", async (e) => {
//         e.preventDefault();
//         // clear previous message
//         if (loginError) { loginError.style.display = "none"; loginError.textContent = ""; }

//         const email = document.getElementById("email").value.trim();
//         const password = document.getElementById("password").value;

//         if (!email || !password) {
//             if (loginError) { loginError.textContent = "Email and password are required."; loginError.style.display = "block"; }
//             return;
//         }

//         try {
//             const res = await fetch("http://localhost:8000/api/v1/users/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 credentials: "include",
//                 body: JSON.stringify({ email, password })
//             });

//             if (!res.ok) {
//                 // try to read JSON message (common) or plain text
//                 let message = `Login failed (status ${res.status})`;
//                 try {
//                     const json = await res.json();
//                     if (json && (json.message || json.error)) message = json.message || json.error;
//                 } catch (_) {
//                     try { message = await res.text(); } catch (_) { }
//                 }
//                 console.error("Login failed:", res.status, message);
//                 if (loginError) { loginError.textContent = message; loginError.style.display = "block"; } else { alert(message); }
//                 return;
//             }

//             const data = await res.json();
//             console.log("Login success:", data);
//             // redirect to pages index explicitly
//             window.location.href = "/pages/index.html";

//         } catch (err) {
//             console.error("Network error:", err);
//             if (loginError) { loginError.textContent = "Network error. Is the backend running?"; loginError.style.display = "block"; } else { alert("Network error. Is the backend running?"); }
//         }
//     });
// } else {
//     console.warn("Login button (#login) not found on this page.");
// }




// js/user.call.js

const loginBtn = document.getElementById("login");
const loginError = document.getElementById("login_error");

if (loginBtn) {
    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        // clear previous error
        if (loginError) {
            loginError.style.display = "none";
            loginError.textContent = "";
        }

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        // make sure inputs exist
        if (!emailInput || !passwordInput) {
            console.error("Email or password input not found in DOM.");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // basic validation
        if (!email || !password) {
            if (loginError) {
                loginError.textContent = "Email and password are required.";
                loginError.style.display = "block";
            }
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/v1/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // only use this if backend is setting cookies + CORS is configured
                // credentials: "include",
                body: JSON.stringify({ email, password })
            });

            // Try to parse JSON once (works for both error + success)
            let data = null;
            try {
                data = await res.json();
            } catch {
                // maybe plain text / empty response, so ignore
            }

            if (!res.ok) {
                let message = `Login failed (status ${res.status})`;

                if (data && (data.message || data.error)) {
                    message = data.message || data.error;
                }

                console.error("Login failed:", res.status, message);

                if (loginError) {
                    loginError.textContent = message;
                    loginError.style.display = "block";
                } else {
                    alert(message);
                }
                return;
            }

            console.log("Login success:", data);

            // redirect after successful login
            window.location.href = "/pages/index.html";

        } catch (err) {
            console.error("Network error:", err);
            if (loginError) {
                loginError.textContent = "Network error. Is the backend running?";
                loginError.style.display = "block";
            } else {
                alert("Network error. Is the backend running?");
            }
        }
    });
} else {
    console.warn('Login button with id="login" not found on this page.');
}

//done