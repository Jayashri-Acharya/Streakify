function getData() {
return JSON.parse(localStorage.getItem('routineData')) || defaultData;
}


function saveData(data) {
localStorage.setItem('routineData', JSON.stringify(data));
}