import API_BASE_URL from "./config.js";
document.addEventListener("DOMContentLoaded", loadUser);

async function loadUser() {
  const profileBtn = document.getElementById("user_name");
  const profileLabel = document.getElementById("user_name_label");

  if (!profileBtn && !profileLabel) {
    console.warn("Profile UI elements not found.");
    return;
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/users/get-username`,
      {
        method: "GET",
        credentials: "include", // required for cookie-based auth
      }
    );

    // Not authenticated → redirect
    if (res.status === 401 || res.status === 403) {
      redirectToLogin();
      return;
    }

    if (!res.ok) {
      console.error("Failed to fetch username:", res.status);
      return;
    }

    const data = await safeParseJSON(res);

    const username =
      data?.username ||
      data?.user?.username ||
      data?.data?.username ||
      null;

    if (!username) {
      console.warn("Username missing in API response:", data);
      return;
    }

    updateProfileUI(username);

  } catch (error) {
    console.error("Error while loading user:", error);
  }
}

//helper function 

function updateProfileUI(username) {
  const profileBtn = document.getElementById("user_name");
  const profileLabel = document.getElementById("user_name_label");

  if (profileBtn) {
    profileBtn.textContent = username;
    profileBtn.title = username;
  }

  if (profileLabel) {
    profileLabel.textContent = username;
  }
}

function redirectToLogin() {
  window.location.href = "/login";
}

async function safeParseJSON(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

//done 