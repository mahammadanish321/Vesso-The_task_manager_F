document.addEventListener("change", async (e) => {
  const checkbox = e.target.closest(".complete-checkbox");
  if (!checkbox) return;

  const taskId = checkbox.dataset.id;
  if (!taskId) return;

  try {
    const res = await fetch(
      "http://localhost:8000/api/v1/task/task-complete",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ taskId }),
      }
    );

    if (!res.ok) {
      console.error("Failed to toggle task completion");
      // revert UI if backend fails
      checkbox.checked = !checkbox.checked;
      return;
    }

    if (typeof loadAllTasks === "function") {
      loadAllTasks();
    }

  } catch (err) {
    console.error("Complete toggle error:", err);
    checkbox.checked = !checkbox.checked;
  }
});
