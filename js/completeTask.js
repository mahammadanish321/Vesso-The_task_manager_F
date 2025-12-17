import api from "./utils/api.js";
document.addEventListener("change", async (e) => {
  console.log("CHANGE FIRED ON:", e.target);
  const checkbox = e.target.closest(".complete-checkbox");
  console.log("Checkbox found:", checkbox);
  if (!checkbox) return;

  const taskId = checkbox.dataset.id;
  if (!taskId) {
    console.error("Checkbox missing task ID");
    return;
  }

  const newState = checkbox.checked;
  checkbox.disabled = true;

  try {
    const res = await api.patch("/api/v1/task/task-complete", { taskId });

    if (!res.ok) {
      // revert UI if backend fails
      checkbox.checked = !newState;
      console.error("Failed to toggle task completion");
    }
  } catch (err) {
    // revert UI on network / runtime error
    checkbox.checked = !newState;
    console.error("Complete toggle error:", err);
  } finally {
    checkbox.disabled = false;
  }
});
