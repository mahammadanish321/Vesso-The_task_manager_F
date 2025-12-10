const logoutBtn = document.getElementById("log_out");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/api/v1/users/logout", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                credentials: "include" // VERY IMPORTANT → sends cookies with request
            });

            // If logout success (200 / 204)
            if (res.ok) {
                console.log("Logout success");

                // optional: see what non-HttpOnly cookies exist
                console.log("document.cookie:", document.cookie);

                window.location.href = "/pages/login.html";
                return;
            }

            // If server says you're already logged-out → just redirect
            if (res.status === 401 || res.status === 403) {
                window.location.href = "/pages/login.html";
                return;
            }

            // Other server errors
            const msg = await res.text();
            console.error("Logout failed:", res.status, msg);
            alert("Logout failed. Check backend server or CORS settings.");

        } catch (err) {
            console.error("Logout error:", err);
            alert("Network error. Backend might be offline.");
        }
    });
} else {
    console.warn("Logout button (#log_out) not found on this page.");
}

