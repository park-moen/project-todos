// states
let dataOfEachMonth = [];
 
// DOMs
let $thisMonth = document.querySelector('.this-month');
const $calendarMonths = document.querySelector('.calendar-months');
const $calendarDates = document.querySelector('.calendar-dates');

// functions
const fetchDataOfEachMonths = () => [
  { month: 1, startDay: 3, lastDate: 31 }, { month: 2, startDay: 6, lastDate: 29 },
  { month: 3, startDay: 0, lastDate: 31 }, { month: 4, startDay: 3, lastDate: 30 },
  { month: 5, startDay: 5, lastDate: 30 }, { month: 6, startDay: 1, lastDate: 30 },
  { month: 7, startDay: 3, lastDate: 31 }, { month: 8, startDay: 6, lastDate: 31 },
  { month: 9, startDay: 2, lastDate: 30 }, { month: 10, startDay: 4, lastDate: 31 },
  { month: 11, startDay: 0, lastDate: 30 }, { month: 12, startDay: 2, lastDate: 31 },
];

const getThisMonth = selected => {
  [...$calendarMonths.children].forEach(month => month === selected ? 
    month.classList.toggle('this-month', true) : month.classList.toggle('this-month', false));
}

const renderCalendar = () => {
  $thisMonth = document.querySelector('.this-month');
  const selectedMonth = dataOfEachMonth[+$thisMonth.textContent - 1];
  $calendarDates.innerHTML = '';
  for (let i = 0; i < selectedMonth.startDay; i++) {
    const $li = document.createElement('li');
    $li.classList.add('calendar-space');
    $calendarDates.appendChild($li);
  }
  for (let i = 1; i <= selectedMonth.lastDate; i++) {
    const $li = document.createElement('li');
    $li.classList.add('calendar-date');
    $li.appendChild(document.createTextNode(i + ''));
    $calendarDates.appendChild($li);
  }
};

// EVENTS
document.addEventListener('DOMContentLoaded', () => {
  dataOfEachMonth = fetchDataOfEachMonths();
  console.log(dataOfEachMonth);
  renderCalendar();
});

$calendarMonths.onclick = e => {
  if (!e.target.classList.contains('month')) return;
  console.log(e.target);
  getThisMonth(e.target);
  renderCalendar();
};