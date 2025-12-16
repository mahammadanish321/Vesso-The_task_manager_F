import API_BASE_URL from "./config.js";
document.addEventListener("click", async (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const restoreBtn = e.target.closest(".restore-btn");

  if (deleteBtn) {
    const taskId = deleteBtn.dataset.id;
    await toggleDelete(taskId);
  }

  if (restoreBtn) {
    const taskId = restoreBtn.dataset.id;
    await toggleDelete(taskId);
  }
});

async function toggleDelete(taskId) {
  if (!taskId) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/task/task-delete-bin`,
      {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ taskId }),
      }
    );

    if (!res.ok) {
      console.error("Failed to update task delete state");
      return;
    }

    // refresh UI
    window.location.reload();

  } catch (error) {
    console.error("Delete/Restore error:", error);
  }
}

//done 