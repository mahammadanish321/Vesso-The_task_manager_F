import api from "./utils/api.js";
import { loadAllTasks } from "./getAllTask.js";
import { showToast } from "./utils/ui.js";
// ================= EDIT STATE =================
let editingTaskId = null;

// ================= CLICK HANDLER =================
document.addEventListener("click", async (e) => {
  const editBtn = e.target.closest(".edit-btn");
  const backBtn = e.target.closest("#back_from_edit");
  const doEditBtn = e.target.closest("#do_edit");

  // ---- OPEN EDIT FORM ----
  if (editBtn) {
    const taskId = editBtn.dataset.id;
    openEditForm(taskId, editBtn);
  }

  // ---- BACK FROM EDIT ----
  if (backBtn) {
    closeEditForm();
  }

  // ---- DO EDIT ----
  if (doEditBtn) {
    await submitEdit();
  }
});

// ================= OPEN EDIT =================
function openEditForm(taskId, editBtn) {
  if (!taskId) return;

  editingTaskId = taskId;

  const card = editBtn.closest(".task-card");
  if (!card) return;

  const taskName =
    card.querySelector(".task-title")?.innerText || "";
  const description =
    card.querySelector(".task-description")?.innerText || "";

  document.getElementById("edit_name_form").value = taskName;
  document.getElementById("edit_description_from").value = description;

  document.getElementById("edit").style.display = "block";
}

// ================= CLOSE EDIT =================
function closeEditForm() {
  document.getElementById("edit").style.display = "none";
  editingTaskId = null;
}

// ================= EDIT API =================
async function submitEdit() {
  if (!editingTaskId) return;

  const taskName = document
    .getElementById("edit_name_form")
    .value.trim();

  const description = document
    .getElementById("edit_description_from")
    .value.trim();

  if (!taskName || !description) {
    alert("Both fields are required");
    return;
  }

  try {
    const res = await api.patch("/api/v1/task/edit-task", {
      taskId: editingTaskId,
      taskName,
      description,
    });

    if (!res.ok) {
      showToast("Failed to edit task", "error");
      return;
    }

    // Refresh UI fast
    await loadAllTasks();

    closeEditForm();
    showToast("Task updated successfully");

  } catch (error) {
    console.error("Edit error:", error);
    showToast("Network error", "error");
  }
}
