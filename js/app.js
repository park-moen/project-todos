// states
let todos = [];

const fetchTodos = () => {
  todos = [];

  listRender();
}

// DOMs
const $todosList = document.querySelector('.todos-list');
const $todosInput = document.querySelector('.todos-input');

// functions

// todos function
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

// EVENTS
window.onload = fetchTodos;

$todosInput.onkeyup = e => {
  if (e.key !== 'Enter' || !e.target.value) return;

  addTodosList($todosInput.value);
  $todosInput.value = '';
}