const defaultData = {
lastDate: null,
streak: 0,
points: 0,
routines: {
eat: {
Breakfast: ['Idli / Dosa', 'Banana + Milk'],
Lunch: ['Rice / Roti', 'Dal / Paneer'],
Extra: ['Milk / Shake']
},
fitness: {
Yoga: ['Surya Namaskar', 'Pranayama'],
Exercise: ['Walking', 'Stretching']
},
study: {
Daily: ['DSA Practice', 'Python / Java'],
Learning: ['Online Course', 'Tutorial Video']
},
projects: {
Projects: ['To-Do App', 'BMI Calculator'],
Weekly: ['GitHub Update', 'Resume Update']
},
selfcare: {
Care: ['Skin Care', 'Hair Oiling'],
Mind: ['Breathing', 'Affirmations']
},
habits: {
Habits: ['Wake Up Early', 'Drink Water', 'No Junk Food']
}
},
completed: {}
};
function getData() {
  const stored = JSON.parse(localStorage.getItem("routineData"));

  // If nothing exists → load defaults
  if (!stored) {
    localStorage.setItem("routineData", JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }

  // Merge missing fields (VERY IMPORTANT)
  return {
    ...structuredClone(defaultData),
    ...stored,
    routines: stored.routines || structuredClone(defaultData.routines),
    completed: stored.completed || {}
  };
}


function saveData(data) {
  localStorage.setItem("routineData", JSON.stringify(data));
}

