// tracker.js

function updateStreak() {
  const today = new Date().toDateString();

  let lastDate = localStorage.getItem("lastDate");
  let streak = parseInt(localStorage.getItem("streak")) || 0;

  if (!lastDate) {
    streak = 1;
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastDate === today) {
      return; // already counted today
    } else if (lastDate === yesterday.toDateString()) {
      streak += 1;
    } else {
      streak = 1;
    }
  }

  localStorage.setItem("streak", streak);
  localStorage.setItem("lastDate", today);

  const streakEl = document.getElementById("streak");
  if (streakEl) {
    streakEl.innerText = streak;
  }
}

function loadStreak() {
  const streak = localStorage.getItem("streak") || 0;
  const streakEl = document.getElementById("streak");
  if (streakEl) {
    streakEl.innerText = streak;
  }
}

document.addEventListener("DOMContentLoaded", loadStreak);
