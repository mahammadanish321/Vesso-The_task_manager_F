// document.addEventListener("click", async (e) => {
//   // DELETE button on index page
//   if (e.target.classList.contains("delete-btn")) {
//     const taskId = e.target.dataset.id;
//     await toggleDelete(taskId);
//   }

//   // RESTORE button on bin page
//   if (e.target.classList.contains("restore-btn")) {
//     const taskId = e.target.dataset.id;
//     await toggleDelete(taskId);
//   }
// });

// async function toggleDelete(taskId) {
//   if (!taskId) return;

//   try {
//     const res = await fetch(
//       "http://localhost:8000/api/v1/task/task-delete-bin",
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ taskId }),
//       }
//     );

//     if (!res.ok) {
//       console.error("Failed to update task delete state");
//       return;
//     }

//     // 🔁 reload current page to reflect changes
//     window.location.reload();

//   } catch (err) {
//     console.error("Delete/Restore error:", err);
//   }
// }



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
      "http://localhost:8000/api/v1/task/task-delete-bin",
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
