import api from "./utils/api.js";
document.addEventListener("DOMContentLoaded", loadAllTasks)

export async function loadAllTasks() {
  const taskContainer = document.getElementById("task_card_show_area")
  if (!taskContainer) return

  try {
    const res = await api.get("/api/v1/task/all-task");
    // console.log(res); //debug

    if (res.status === 401 || res.status === 403) {
      window.location.href = "/login.html"
      return
    }

    if (!res.ok) return

    const { data } = await res.json()
    const tasks = data?.tasks || []

    // 🔥 show ONLY active tasks
    const activeTasks = tasks.filter((task) => task.isDeleted === false)

    taskContainer.innerHTML = ""

    if (activeTasks.length === 0) {
      taskContainer.innerHTML = "<p>No tasks found.</p>"
      return
    }

    activeTasks.forEach((task) => {
      taskContainer.appendChild(createTaskCard(task))
    })
  } catch (err) {
    console.error("Error loading tasks:", err)
  }
}

function createTaskCard(task) {
  const card = document.createElement("div")
  card.className = task.isCompleted ? "task-card completed" : "task-card"
  // </CHANGE>

  card.innerHTML = `
    <h2 class="task-title">${escapeHTML(task.taskName)}</h2>

    <p class="task-description">
      ${escapeHTML(task.description)}
    </p>

    <p class="task-time">
      Created: ${new Date(task.createdAt).toLocaleDateString()}
    </p>

    <div class="task-actions">
      <div class="complete-section">
        <input 
          type="checkbox"
          class="complete-checkbox"
          data-id="${task._id}"
          ${task.isCompleted ? "checked" : ""}
        />
        <label>Mark Complete</label>
      </div>

      <div class="action-buttons">
        <button 
          class="button edit-btn"
          data-id="${task._id}">
          Edit
        </button>

        <button 
          class="button button-danger delete-btn"
          data-id="${task._id}">
          Delete
        </button>
      </div>
    </div>
  `

  return card
}

function escapeHTML(text = "") {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}

//done

