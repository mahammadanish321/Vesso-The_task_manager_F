/**
 * Shows a toast notification that disappears automatically.
 * @param {string} message - The message to display.
 * @param {string} type - 'success' or 'error' (default: 'success').
 */
export function showToast(message, type = "success") {
    // Create toast container if it doesn't exist
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement("div");
    toast.textContent = message;

    // Styles based on type
    const bgColor = type === "error" ? "#e74c3c" : "#2ecc71";
    const textColor = "#fff";

    toast.style.cssText = `
      background-color: ${bgColor};
      color: ${textColor};
      padding: 12px 24px;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-family: sans-serif;
      font-size: 14px;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      min-width: 200px;
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";

        // Remove from DOM after animation
        toast.addEventListener("transitionend", () => {
            toast.remove();
        });
    }, 3000);
}
