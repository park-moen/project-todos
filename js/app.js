// states
let dataOfEachMonth = [];
let todos = [];
let todosOfSelectedMonth = []; // 선택된 달의 일정만 담을 배열
const today = new Date();
const days = ['일', '월', '화', '수', '목', '금', '토'];
// CalendarDOMs
let $thisMonth = document.querySelector('.this-month');
const $calendarMonths = document.querySelector('.calendar-months');
const $calendarDates = document.querySelector('.calendar-dates');
// TodosDOMs
const $todosList = document.querySelector('.todos-list');
const $todosInput = document.querySelector('.todos-input');
const $todoDate = document.querySelector('.todos-date');
const $todoDay = document.querySelector('.todos-day');
const $monthlyBtn = document.querySelector('.display-monthly-todos');
const $monthlyPlan = document.querySelector('.monthly-plan');
// Calendar functions
const fetchDataOfEachMonths = () => [
  { month: 1, startDay: 3, lastDate: 31 }, { month: 2, startDay: 6, lastDate: 29 },
  { month: 3, startDay: 0, lastDate: 31 }, { month: 4, startDay: 3, lastDate: 30 },
  { month: 5, startDay: 5, lastDate: 31 }, { month: 6, startDay: 1, lastDate: 30 },
  { month: 7, startDay: 3, lastDate: 31 }, { month: 8, startDay: 6, lastDate: 31 },
  { month: 9, startDay: 2, lastDate: 30 }, { month: 10, startDay: 4, lastDate: 31 },
  { month: 11, startDay: 0, lastDate: 30 }, { month: 12, startDay: 2, lastDate: 31 },
];

const filterScheduleByMonth = () => {
  todosOfSelectedMonth = todos.filter(todo => +todo.month === +document.querySelector('.this-month').textContent);
};
const getThisMonth = selected => {
  [...$calendarMonths.children].forEach(month => month === selected ? 
    month.classList.toggle('this-month', true) : month.classList.toggle('this-month', false));
};
const addSunSatClass = () => {
  [...$calendarDates.children].forEach((date, i) => {
    if ((i+1) % 7 === 0) { date.classList.add('sat'); }
    if ((i+1) % 7 === 1) { date.classList.add('sun'); }
  });
};
const checkSelect = () => {
  if (document.querySelector('.date-selected')) {
    $todosInput.setAttribute('placeholder', '일정을 입력하세요!');
  } else {
    $todosInput.setAttribute('placeholder', '날짜를 선택해주세요!');
  }
}

const renderCalendar = () => {
  $thisMonth = document.querySelector('.this-month');
  const selectedMonth = dataOfEachMonth[+$thisMonth.textContent - 1];
  $calendarDates.innerHTML = '';
  filterScheduleByMonth();
  for (let i = 0; i < selectedMonth.startDay; i++) {
    const $li = document.createElement('li');
    $li.classList.add('calendar-space');
    $calendarDates.appendChild($li);
  }
  for (let i = 1; i <= selectedMonth.lastDate; i++) {
    const $li = document.createElement('li');
    $li.classList.add('calendar-date');
    $li.appendChild(document.createTextNode(i + ''));
    if (todosOfSelectedMonth.length) {
      todosOfSelectedMonth.forEach(todo => {
        if (+todo.date === i) $li.classList.add('scheduled');
      });
    }
    if (today.getDate() === i && +today.getMonth() + 1 === +document.querySelector('.this-month').textContent) $li.classList.add('today');
    $calendarDates.appendChild($li);
  }
  addSunSatClass();
};
// Todos function
const listRender = () => {
  let html = '';
  todos.filter(todo => todo.month === +$thisMonth.textContent && todo.date === +document.querySelector('.date-selected').textContent).forEach(
    ({ id, todo, completed }) => {
      html += `
        <li id="${id}" class="todo-item">
          <label><input type="checkbox" ${completed ? ' checked' : ''}><span>${todo}</span></label>
          <i class="remove-todo fa fa-trash-o" aria-hidden="true"></i>
       </li>`;
    }
  );
  $todosList.innerHTML = html;
};
const fetchTodos = () => {
  todos = [];
  listRender();
};
const maxId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);
const addTodosList = todo => {
  const newMonth = +document.querySelector('.this-month').textContent;
  const newDate = +document.querySelector('.date-selected').textContent;
  let newDay = (newDate % 7) + dataOfEachMonth[newMonth - 1].startDay - 1;
  newDay = newDay > 6 ? newDay - 7 : (newDay === -1 ? 6 : newDay);
  todos = [...todos, { id: maxId(), month: newMonth, date: newDate , day: newDay, todo, completed: false }];
  listRender($todosInput.value);
};
const checkTodosLengthOverFive = () => {
  if (todosOfSelectedMonth.filter(todo => +todo.date === +document.querySelector('.date-selected').textContent).length > 4) {
    return true;
  }
  return false;
}
const editAlert = msg => {
  document.querySelector('.alert').textContent = msg;
};
const removeTodosList = id => {
  todos = todos.filter(todo => todo.id !== +id);
  listRender();
};
const updateCompleted = target => {
  todos.forEach(todo => {
    if (todo.id === +target.parentNode.parentNode.id) todo.completed = !todo.completed;
  });
};
const renderDay = targetDay => {
  const newMonth = +document.querySelector('.this-month').textContent;
  const newDate = +document.querySelector('.date-selected').textContent;
  let newDay = (newDate % 7) + dataOfEachMonth[newMonth - 1].startDay - 1;
  newDay = newDay > 6 ? newDay - 7 : (newDay === -1 ? 6 : newDay);
  $todoDate.textContent = targetDay.textContent;
  $todoDay.textContent = days[newDay];
};
const renderToday = () => {
  $todoDate.textContent = today.getDate() + '';
  $todoDay.textContent = days[today.getDay()];
};
const addScheduled = selected => {
  selected.classList.add('scheduled');
};
const displayMonthlyTodos = () => {
  if (!todosOfSelectedMonth.length) $monthlyPlan.textContent = "이번달에 입력한 일정이 없습니다.";
  else if (todosOfSelectedMonth.length) $monthlyPlan.innerHTML = todosOfSelectedMonth.map(todo => `<li>${todo.month}월 ${todo.date}일 : ${todo.todo}</li>`).join('');
  
  if ($monthlyPlan.classList.contains('show')) {
    $monthlyBtn.textContent = '닫기';
  } else {
    $monthlyBtn.textContent = '월간일정 보기';
  }
};
// CalendarEVENTS
document.addEventListener('DOMContentLoaded', () => {
  dataOfEachMonth = fetchDataOfEachMonths();
  console.log(dataOfEachMonth);
  renderCalendar();
  filterScheduleByMonth(today.getMonth());
  renderToday();
});
$calendarMonths.onclick = e => {
  if (!e.target.classList.contains('month')) return;
  console.log(e.target);
  getThisMonth(e.target);
  filterScheduleByMonth();
  renderCalendar();
  $monthlyPlan.classList.remove('show');
};
$calendarDates.onclick = e => {
  if (!e.target.matches('.calendar-date')) return;
  [...$calendarDates.children].forEach(date => {
    date.classList.toggle('date-selected', e.target === date);
  });
  renderDay(e.target);
};

$calendarDates.onclick = e => {
  if (!e.target.matches('.calendar-date')) return;
  [...$calendarDates.children].forEach(date => {
    date.classList.toggle('date-selected', e.target === date);
  });
  renderDay(e.target);
  listRender();
  checkSelect();
};
$calendarDates.oncontextmenu = e => {
  if (!e.target.matches('.calendar-date')) return;
  e.preventDefault();
  [...$calendarDates.children].forEach(date => {
    date.classList.remove('date-selected');
  });
  checkSelect();
};

// TodosEVENTS
window.onload = fetchTodos;
$todosInput.onkeyup = e => {
  if (e.key !== 'Enter' || !e.target.value) return;
  //이거를 함수로!!!!
  filterScheduleByMonth();
  console.log(checkTodosLengthOverFive());
  if (checkTodosLengthOverFive()) {
    console.log(checkTodosLengthOverFive());
    $todosInput.value = '';
    editAlert('일정 추가는 최대 5개까지 가능합니다.');
    console.log(document.querySelector('.alert').textContent);
    setTimeout(editAlert, 2000, '');
    return;
  }
  console.log(e.target);
  addTodosList($todosInput.value);
  addScheduled(document.querySelector('.date-selected')); // 애드하면 스케쥴 클래스붙힘
  filterScheduleByMonth();
  $todosInput.value = '';
};
$todosList.onclick = e => {
  if (!e.target.matches('.remove-todo')) return;
  removeTodosList(e.target.parentNode.id);
  displayMonthlyTodos();
  $monthlyPlan.classList.remove('show');
  renderCalendar();
};
$todosList.onchange = e => {
  updateCompleted(e.target);
};
$monthlyBtn.onclick = e => {
  $monthlyPlan.classList.toggle('show');
  // if (!todosOfSelectedMonth.length) $monthlyPlan.textContent = "이번달에 입력한 일정이 없습니다.";
  // else if (todosOfSelectedMonth.length) $monthlyPlan.innerHTML = todosOfSelectedMonth.map(todo => `<li>${todo.month}월 ${todo.date}일 : ${todo.todo}</li>`).join('');
  
  // if ($monthlyPlan.classList.contains('show')) {
  //   $monthlyBtn.textContent = '닫기';
  // } else {
  //   $monthlyBtn.textContent = '월간일정 보기';
  // }
  displayMonthlyTodos();
};
