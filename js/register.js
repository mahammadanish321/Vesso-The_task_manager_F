// const register = document.getElementById("Register");

// register.addEventListener("click", async () => {
//     const username = document.getElementById("username").value
//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value
//     console.log(username, email, password);
    
//     try {
//         const res = await fetch("http://localhost:4000/api/v1/users/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ username, email, password })
//         });

//         // if route not found or server error, log text instead of trying JSON
//         if (!res.ok) {
//             const text = await res.text();
//             console.error("Server error:", res.status, text);
//             return;
//         }
//         window.location.href = "/pages/index.html";

//         const data = await res.json();
//         console.log("Success:", data);
//     } catch (err) {
//         console.error("Network error:", err);
//     }
// });





// const register = document.getElementById("Register");
// const registerError = document.getElementById("register_error");

// if (register) {
//     register.addEventListener("click", async (e) => {
//         e.preventDefault();

//         if (registerError) {
//             registerError.style.display = "none";
//             registerError.textContent = "";
//         }

//         const username = document.getElementById("username").value.trim();
//         const email = document.getElementById("email").value.trim();
//         const password = document.getElementById("password").value;

//         if (!username || !email || !password) {
//             if (registerError) {
//                 registerError.textContent = "All fields are required.";
//                 registerError.style.display = "block";
//             }
//             return;
//         }

//         try {
//             const res = await fetch("http://localhost:8000/api/v1/users/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 credentials: "include",
//                 body: JSON.stringify({ username, email, password })
//             });

//             if (!res.ok) {
//                 let message = `Registration failed (status ${res.status})`;

//                 try {
//                     const json = await res.json();
//                     if (json && (json.message || json.error)) {
//                         message = json.message || json.error;
//                     }
//                 } catch (_) {
//                     try {
//                         message = await res.text();
//                     } catch (_) {}
//                 }

//                 console.error("Register failed:", res.status, message);

//                 if (registerError) {
//                     registerError.textContent = message;
//                     registerError.style.display = "block";
//                 } else {
//                     alert(message);
//                 }
//                 return;
//             }

//             const data = await res.json();
//             console.log("Register success:", data);

//             window.location.href = "/pages/login.html";

//         } catch (err) {
//             console.error("Network error:", err);
//             if (registerError) {
//                 registerError.textContent = "Network error. Is the backend running?";
//                 registerError.style.display = "block";
//             }
//         }
//     });
// } else {
//     console.warn("Register button (#Register) not found on this page.");
// }



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
            const res = await fetch("http://localhost:8000/api/v1/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // use this only if your backend is setting cookies + CORS is configured
                // credentials: "include",
                body: JSON.stringify({ username, email, password })
            });

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
            window.location.href = "/pages/login.html";

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





