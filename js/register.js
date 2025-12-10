const register = document.getElementById("Register");

register.addEventListener("click", async () => {
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(username, email, password);
    
    try {
        const res = await fetch("http://localhost:8000/api/v1/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        // if route not found or server error, log text instead of trying JSON
        if (!res.ok) {
            const text = await res.text();
            console.error("Server error:", res.status, text);
            return;
        }
        window.location.href = "/register.html";

        const data = await res.json();
        console.log("Success:", data);
    } catch (err) {
        console.error("Network error:", err);
    }
});




