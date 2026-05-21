function cloneData(data) {
  return typeof structuredClone === "function"
    ? structuredClone(data)
    : JSON.parse(JSON.stringify(data));
}

function getData() {
  const stored = JSON.parse(localStorage.getItem("routineData"));

  if (!stored) {
    const initialData = cloneData(defaultData);
    localStorage.setItem("routineData", JSON.stringify(initialData));
    return initialData;
  }

  return {
    ...cloneData(defaultData),
    ...stored,
    routines: stored.routines || cloneData(defaultData.routines),
    completed: stored.completed || {}
  };
}

function saveData(data) {
  localStorage.setItem("routineData", JSON.stringify(data));
}
