// states
let dataOfEachMonth = [];
let todos = [];
const today = new Date();
// DOMs
const $calendarMonths = document.querySelector('.calendar-months');
const $todosList = document.querySelector('.todos-list');
const $todosInput = document.querySelector('.todos-input');
// functions
const fetchTodos = () => {
  todos = [];
  listRender();
}
const listRender = () => {
  let html = '';
  todos.forEach(
    ({ id, content, completed }) => {
      html += `
        <li id="${id}">
          <label><input type="checkbox" ${completed ? ' checked' : ''}><span>${content}</span></label>
          <button class="remove">X</button>
       </li>`;
    }
  );
  $todosList.innerHTML = html;
};
const maxId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);
const addTodosList = content => {
  todos = [...todos, {id: maxId(), content, completed: false}];
  listRender();
}

const getThisMonth = selected => {
  [...$calendarMonths.children].forEach(month => month === selected ? 
    month.classList.toggle('this-month', true) : month.classList.toggle('this-month', false));
};

const fetchDataOfEachMonths = () => [
  { month: 1, startDay: 3, lastDate: 31 }, { month: 2, startDay: 6, lastDate: 29 },
  { month: 3, startDay: 0, lastDate: 31 }, { month: 4, startDay: 3, lastDate: 30 },
  { month: 5, startDay: 3, lastDate: 30 }, { month: 6, startDay: 1, lastDate: 30 },
  { month: 7, startDay: 3, lastDate: 31 }, { month: 8, startDay: 6, lastDate: 31 },
  { month: 9, startDay: 2, lastDate: 30 }, { month: 10, startDay: 4, lastDate: 31 },
  { month: 11, startDay: 0, lastDate: 30 }, { month: 12, startDay: 2, lastDate: 31 },
];
// EVENTS
document.addEventListener('DOMContentLoaded', () => {
  dataOfEachMonth = fetchDataOfMonths();
  console.log(dataOfEachMonth);
});

$calendarMonths.onclick = e => {
  if (!e.target.classList.contains('month')) return;
  getThisMonth(e.target);
}
window.onload = fetchTodos;
$todosInput.onkeyup = e => {
  if (e.key !== 'Enter' || !e.target.value) return;
  if (todos.length >= 5) {
    document.querySelector('.alert').textContent = '일정 추가는 최대 5개까지 가능합니다ㅎ';
    setTimeout(() =>{
      document.querySelector('.alert').textContent = '';
    }, 2000);
    return;

  }
  addTodosList($todosInput.value);
  $todosInput.value = '';
}