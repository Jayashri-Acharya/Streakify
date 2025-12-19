function addRoutineItem(category) {
  const data = getData();
  const section = document.getElementById("sectionSelect").value;
  const input = document.getElementById("newItemInput");
  const value = input.value.trim();

  if (!value) {
    showToast("Please enter an item", "warning");
    return;
  }

  data.routines[category][section].push(value);
  saveData(data);

  showToast("Item added successfully", "success");

  input.value = "";
  renderRoutinePage(category);
}

function deleteRoutineItem(category, section, index) {
  const data = getData();

  data.routines[category][section].splice(index, 1);
  saveData(data);

  showToast("Item deleted", "error");

  renderRoutinePage(category);
}

function editRoutineItem(category, section, index) {
  const data = getData();
  const oldValue = data.routines[category][section][index];
  const updated = prompt("Edit item", oldValue);

  if (!updated) return;

  data.routines[category][section][index] = updated;
  saveData(data);

  showToast("Item updated", "info");

  renderRoutinePage(category);
}

function addCategory(category) {
  const data = getData();
  const input = document.getElementById("newCategoryInput");
  const name = input.value.trim();

  if (!name) {
    showToast("Enter category name", "warning");
    return;
  }

  if (data.routines[category][name]) {
    showToast("Category already exists", "error");
    return;
  }

  data.routines[category][name] = [];
  saveData(data);

  populateCategoryDropdown(category);

  showToast("Category added", "success");

  input.value = "";
  renderRoutinePage(category);
}

function deleteCategory(category, section) {
  const data = getData();

  if (data.routines[category][section].length > 0) {
    showToast("Delete items first", "warning");
    return;
  }

  delete data.routines[category][section];
  saveData(data);

  showToast("Category deleted", "error");

  renderRoutinePage(category);
}

function renameCategory(category, oldName) {
  const data = getData();

  const newName = prompt("Enter new category name:", oldName);
  if (!newName) return;

  const trimmed = newName.trim();

  if (data.routines[category][trimmed]) {
    showToast("Category name already exists", "error");
    return;
  }

  data.routines[category][trimmed] =
    data.routines[category][oldName];

  delete data.routines[category][oldName];
  saveData(data);

  showToast("Category renamed", "info");

  renderRoutinePage(category);
}
