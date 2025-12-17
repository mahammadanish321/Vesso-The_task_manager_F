import api from "./utils/api.js";
import { loadDeletedTasks } from "./getAllTaskForBin.js";
import { showToast } from "./utils/ui.js";

let pendingDeleteTaskId = null;

//OPEN MODAL
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".permanent-delete-btn");
  if (!btn) return;

  e.stopPropagation();

  pendingDeleteTaskId = btn.dataset.id;
  if (!pendingDeleteTaskId) return;

  const popup = document.getElementById("delete_popup");
  if (popup) {
    popup.style.display = "block"; // Ensure it's visible if using display prop
    popup.classList.add("active");
  }
});

//CANCEL DELETE
document.getElementById("delete_back_btn")?.addEventListener("click", closePopup);
document.getElementById("delete_backdrop")?.addEventListener("click", closePopup);

function closePopup() {
  pendingDeleteTaskId = null;
  const popup = document.getElementById("delete_popup");
  if (popup) {
    popup.style.display = "none";
    popup.classList.remove("active");
  }
}

//CONFIRM DELETE
document.getElementById("sure_Delete")?.addEventListener("click", async () => {
  if (!pendingDeleteTaskId) return;

  const deleteBtn = document.getElementById("sure_Delete");
  deleteBtn.disabled = true;

  try {
    const res = await api.del("/api/v1/task/totally-delete", { taskId: pendingDeleteTaskId });

    // 404 = already deleted → safe
    if (!res.ok && res.status !== 404) {
      showToast("Permanent delete failed", "error");
      return;
    }

    // close modal
    closePopup();

    // refresh bin
    await loadDeletedTasks();
    showToast("Task permanently deleted");

  } catch (err) {
    console.error("Permanent delete error:", err);
    showToast("Network error.", "error");
  } finally {
    deleteBtn.disabled = false;
  }
});
