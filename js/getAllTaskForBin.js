import api from "./utils/api.js";
document.addEventListener("DOMContentLoaded", loadDeletedTasks);

async function loadDeletedTasks() {
  const container = document.getElementById("deleted_task_area");
  if (!container) return;

  try {
    const res = await api.get("/api/v1/task/all-task");
    // console.log(res); //debug


    if (!res.ok) return;

    const { data } = await res.json();
    const tasks = data?.tasks || [];
    // console.log(tasks);  //debug


    const deletedTasks = tasks.filter(task => task.isDeleted == true);
    // console.log(deletedTasks); //debug

    container.innerHTML = "";

    if (deletedTasks.length === 0) {
      container.innerHTML = "<p>Recycle bin is empty.</p>";
      return;
    }

    deletedTasks.forEach(task => {
      container.appendChild(createDeletedTaskCard(task));
    });

  } catch (err) {
    console.error("Error loading deleted tasks:", err);
  }
}

function createDeletedTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";

  card.innerHTML = `
    <h2 class="task-title">${escapeHTML(task.taskName)}</h2>

    <p class="task-description">
      ${escapeHTML(task.description)}
    </p>

    <div class="task-actions">
      <button 
        class="button button-secondary restore-btn"
        data-id="${task._id}">
        Restore
      </button>

      <button 
        class="button button-danger permanent-delete-btn"
        data-id="${task._id}">
        Delete Permanently
      </button>
    </div>
  `;

  return card;
}

function escapeHTML(text = "") {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

//done 

