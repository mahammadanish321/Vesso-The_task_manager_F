const addBtn = document.getElementById("add");

if (!addBtn) {
  console.warn("Add task button not found");
} else {
  addBtn.addEventListener("click", handleAddTask);
}

async function handleAddTask(e) {
  e.preventDefault();

  const taskNameInput = document.getElementById("task_name_form");
  const taskDescInput = document.getElementById("task_description_from");

  if (!taskNameInput || !taskDescInput) {
    console.error("Task input fields not found in DOM");
    return;
  }

  const taskName = taskNameInput.value.trim();
  const description = taskDescInput.value.trim();

  // basic validation
  if (!taskName || !description) {
    alert("Task name and description are required.");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:8000/api/v1/task/creat-task",
      {
        method: "POST",
        credentials: "include", // 🔥 REQUIRED for cookie-based auth
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName,
          description,
        }),
      }
    );

    const data = await safeParseJSON(res);

    if (res.status === 401 || res.status === 403) {
      // not authenticated
      window.location.href = "/pages/login.html";
      return;
    }

    if (!res.ok) {
      const message =
        data?.message ||
        data?.error ||
        "Failed to create task";
      alert(message);
      return;
    }

    console.log("Task created:", data);

    // clear form
    taskNameInput.value = "";
    taskDescInput.value = "";

    // optional: refresh task list
    // loadAllTasks();

  } catch (error) {
    console.error("Error creating task:", error);
    alert("Network error. Please try again.");
  }
}



async function safeParseJSON(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
