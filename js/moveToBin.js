import api from "./utils/api.js";
import { loadAllTasks } from "./getAllTask.js";
import { showToast } from "./utils/ui.js";

document.addEventListener("click", async (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const restoreBtn = e.target.closest(".restore-btn");

  if (deleteBtn) {
    const taskId = deleteBtn.dataset.id;
    await toggleDelete(taskId, "delete");
  }

  if (restoreBtn) {
    const taskId = restoreBtn.dataset.id;
    await toggleDelete(taskId, "restore");
  }
});

async function toggleDelete(taskId, action) {
  if (!taskId) return;

  try {
    const res = await api.patch("/api/v1/task/task-delete-bin", { taskId });

    if (!res.ok) {
      showToast("Failed to update task state", "error");
      return;
    }

    // Refresh UI fast
    // If we are on home page (has loadAllTasks), refresh list
    if (window.location.pathname.includes("home.html") || window.location.pathname === "/") {
      await loadAllTasks();
      showToast("Task moved to bin");
    } else {
      // If on bin page or elsewhere, we might need reload or specific logic
      window.location.reload();
    }

  } catch (error) {
    console.error("Delete/Restore error:", error);
    showToast("Network error", "error");
  }
}

//done 