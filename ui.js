function renderHome() {
  const data = getData();
  if (!data || !data.routines) return;

  const today = new Date().toDateString();
  const completed = data.completed[today] || {};



let total = 0, done = 0;
Object.values(data.routines).forEach(section => {
Object.values(section).forEach(items => {
total += items.length;
items.forEach(i => completed[i] && done++);
});
});


const percent = total ? Math.round((done / total) * 100) : 0;


document.getElementById('todayProgress').innerText = percent + '%';
document.getElementById('streak').innerText =
  localStorage.getItem("streak") || 0;

  document.getElementById("totalTasks").innerText = total;
  document.getElementById("completedTasks").innerText = done;
  document.getElementById("remainingTasks").innerText = total - done;

}
function renderRoutinePage(category) {
  const data = getData();

  // 🛑 Safety checks (VERY IMPORTANT)
  if (!data || !data.routines || !data.routines[category]) {
    console.error("Invalid or missing category:", category);
    return;
  }

  const today = new Date().toDateString();
  if (!data.completed[today]) data.completed[today] = {};

  const container = document.getElementById("routineContainer");
  if (!container) {
    console.error("routineContainer not found");
    return;
  }

  container.innerHTML = "";

  // ✅ Populate dropdown AFTER validation
  populateCategoryDropdown(category);

  let total = 0, done = 0;

  Object.entries(data.routines[category]).forEach(([section, items]) => {
    const sec = document.createElement("div");
    sec.className = "routine-section";

    sec.innerHTML = `
      <h3>
        ${section}
        <button onclick="renameCategory('${category}','${section}')">✏️</button>
        <button onclick="deleteCategory('${category}','${section}')">🗑️</button>
      </h3>
    `;

    items.forEach((item, index) => {
      total++;
      const checked = data.completed[today][item] || false;
      if (checked) done++;

      const row = document.createElement("div");
      row.className = "routine-item";

      row.innerHTML = `
        <label>
          <input type="checkbox" ${checked ? "checked" : ""}>
          ${item}
        </label>
        <div>
          <button onclick="editRoutineItem('${category}','${section}',${index})">✏️</button>
          <button onclick="deleteRoutineItem('${category}','${section}',${index})">🗑️</button>
        </div>
      `;

      row.querySelector("input").addEventListener("change", e => {
  const checked = e.target.checked;

  data.completed[today][item] = checked;
  saveData(data);

  // 🔥 ADD THIS (ONLY when checking, not unchecking)
  if (checked) {
    updateStreak();
  }

  renderRoutinePage(category);
});


      sec.appendChild(row);
    });

    container.appendChild(sec);
  });

  const percent = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("progressPercent").innerText = percent + "%";
  document.getElementById("progressFill").style.width = percent + "%";

  saveData(data);
}




function renderHabits() {
  const data = getData();
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  data.routines[currentCategory].forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <input type="checkbox" ${item.completed ? "checked" : ""} 
        onchange="toggleHabit(${index})">

      <span>${item.text}</span>

      <button onclick="editHabit(${index})">✏</button>
      <button onclick="removeHabit(${index})">❌</button>
    `;

    list.appendChild(li);
  });
}

function populateCategoryDropdown(category) {
  const data = getData();
  const select = document.getElementById("sectionSelect");

  if (!select) return;

  select.innerHTML = "";

  Object.keys(data.routines[category]).forEach(section => {
    const option = document.createElement("option");
    option.value = section;
    option.textContent = section;
    select.appendChild(option);
  });
}



