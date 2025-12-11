// Fetch current username on page load and populate profile UI
document.addEventListener("DOMContentLoaded", async () => {
  const profileBtn = document.getElementById("user_name");
  const profileLabel = document.getElementById("user_name_label");

  if (!profileBtn && !profileLabel) {
    console.warn("No profile UI elements found (#user_name or #user_name_label).");
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/v1/users/get-username", {
      method: "GET",
      credentials: "include"
    });

    if (res.status === 401) {
      window.location.href = "/pages/login.html";
      return;
    }

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("Failed to load username:", res.status, txt);
      return;
    }

    let payload = null;
    try {
      payload = await res.json();
    } catch {
      const txt = await res.text().catch(() => "");
      payload = txt || null;
    }

    const username =
      (payload &&
        (payload.username ||
         payload.user?.username ||
         payload.User?.username ||
         payload.data?.username)) ||
      (typeof payload === "string" ? payload : null);

    if (!username) {
      console.warn("Username not found in response:", payload);
      return;
    }

    // Set username directly (no image logic)
    if (profileBtn) {
      profileBtn.textContent = username;
      profileBtn.title = username;
    }

    if (profileLabel) {
      profileLabel.textContent = username;
    }

  } catch (err) {
    console.error("Error loading username:", err);
  }
});
