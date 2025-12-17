import api from "./utils/api.js";
// let pendingDeleteTaskId = null;

//OPEN MODAL
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".permanent-delete-btn");
  if (!btn) return;

  e.stopPropagation();

  pendingDeleteTaskId = btn.dataset.id;
  if (!pendingDeleteTaskId) return;

  const popup = document.getElementById("delete_popup");
  popup.classList.add("active");
});

//CANCEL DELETE
document.getElementById("cancelDelete")?.addEventListener("click", () => {
  pendingDeleteTaskId = null;
  document.getElementById("delete_popup").classList.remove("active");
});

//CONFIRM DELETE
document.getElementById("sure_Delete")?.addEventListener("click", async () => {
  if (!pendingDeleteTaskId) return;

  const deleteBtn = document.getElementById("sure_Delete");
  deleteBtn.disabled = true;

  try {
    const res = await api.del("/api/v1/task/totally-delete", { taskId: pendingDeleteTaskId });

    // 404 = already deleted → safe
    if (!res.ok && res.status !== 404) {
      console.error("Permanent delete failed");
      return;
    }

    // close modal
    document.getElementById("delete_popup").classList.remove("active");
    pendingDeleteTaskId = null;

    // refresh bin
    if (typeof loadDeletedTasks === "function") {
      loadDeletedTasks();
    }

  } catch (err) {
    console.error("Permanent delete error:", err);
  } finally {
    deleteBtn.disabled = false;
  }
});
