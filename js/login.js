// js/user.call.js

const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Email / username and password are required.");
        return;
    }

    try {
        const res = await fetch("http://localhost:8000/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const msg = await res.text();
            console.error("Login failed:", res.status, msg);
            alert("Login failed. Check credentials or server.");
            return;
        }

        // 🟩 FIX: redirect to index page (same folder as login.html)
        window.location.href = "\index.html";

        const data = await res.json();
        console.log("Login success:", data);

    } catch (err) {
        console.error("Network error:", err);
        alert("Something went wrong. Is the server running?");
    }
});
