function handleNewDayReset() {
  const today = new Date().toDateString();
  const lastActiveDate = localStorage.getItem("lastActiveDate");
  const lastCheckedDate = localStorage.getItem("lastCheckedDate");

  let streak = Number(localStorage.getItem("streak")) || 0;

  // Stop if already processed today
  if (lastCheckedDate === today) return;

  // Save previous streak for animation
  localStorage.setItem("prevStreak", streak);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  if (lastActiveDate === yesterdayStr) {
  streak += 1;

  // 🔥 Motivational streak toast (TOP)
  showToast(
    `🔥 Streak continues! ${streak} day${streak > 1 ? "s" : ""} strong`,
    "success",
    "top"
  );

} else {
  streak = 0;
}


  localStorage.setItem("streak", streak);
  localStorage.setItem("lastCheckedDate", today);
  localStorage.removeItem("todayCompleted");
}

function getLast7DaysReport() {
  const data = getData();
  const routines = data.routines;

  let totalTasks = 0;
  Object.values(routines).forEach(cat =>
    Object.values(cat).forEach(items => totalTasks += items.length)
  );

  let weekData = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(Date.now() - i * 86400000).toDateString();
    const completed = data.completed[date] || {};

    let done = 0;
    Object.values(completed).forEach(v => v && done++);

    const percent = totalTasks ? Math.round((done / totalTasks) * 100) : 0;
    weekData.push({ date, percent });
  }

  return weekData.reverse();
}

function getWeeklyAverage() {
  const week = getLast7DaysReport();
  const sum = week.reduce((a, d) => a + d.percent, 0);
  return Math.round(sum / week.length);
}

document.addEventListener("DOMContentLoaded", () => {
  handleNewDayReset();

  /* ---------- BADGES ---------- */
  const badgesDiv = document.getElementById("badges");
  if (badgesDiv) {
    const streak = Number(localStorage.getItem("streak")) || 0;
    const prevStreak = Number(localStorage.getItem("prevStreak")) || 0;

    const badges = [
  { days: 7, label: "🔥 7-Day Consistency" },
  { days: 30, label: "🏆 30-Day Champion" },
  { days: 60, label: "💎 60-Day Discipline" },
  { days: 90, label: "👑 90-Day Legend" }
];

    badgesDiv.innerHTML = "";

    badges.forEach(b => {
      const div = document.createElement("div");

      if (streak >= b.days) {
        div.className = "badge unlocked";

        if (prevStreak < b.days) {
          div.classList.add("new-unlock");

          const popup = document.getElementById("badgePopup");
          if (popup) {
            popup.innerText = `🎉 ${b.label} Unlocked!`;
            popup.classList.remove("hidden");

            setTimeout(() => popup.classList.add("hidden"), 3000);
          }
        }
      } else {
        div.className = "badge locked";
      }

      div.textContent = b.label;
      badgesDiv.appendChild(div);
    });

    localStorage.setItem("prevStreak", streak);
  }

  /* ---------- MISSED DAY WARNING (ONCE PER DAY) ---------- */
 const data = getData();
if (!data.completed) return;

const today = new Date().toDateString();
const warnedDate = localStorage.getItem("missedDayWarned");

// already warned today
if (warnedDate === today) return;

// get yesterday
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yStr = yesterday.toDateString();

// 🔴 FIRST DAY CHECK
// if no history exists → don't warn
if (Object.keys(data.completed).length === 0) return;

// if yesterday doesn't exist → user didn't use app yesterday
// but also means first usage gap → don't warn
if (!data.completed[yStr]) return;

// check if any task completed yesterday
const didAnyTask = Object.values(data.completed[yStr]).some(v => v === true);

if (!didAnyTask) {
  showToast(
  "⚠️ You missed your routine yesterday. Don’t break the streak today!",
  "warning",
  "top"
);
  localStorage.setItem("missedDayWarned", today);
}

});
