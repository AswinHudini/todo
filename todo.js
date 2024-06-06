let todos = [];
let currentView = 'all';
// {
//     id: 1,
//     name: 'task1',
//     status: "active"
// },  {
//     id: 2,
//     name: 'task2',
//     status: "completed"
// },  {
//     id: 3,
//     name: 'task3',
//     status: "active"
// }   //empty array created


const inputElement = document.querySelector(".new-todo");
const listElement = document.querySelector(".todoList");
const countElement = document.querySelector(".count");


function addTodoItem(value) {
    todos.unshift({ id: Date.now(), task: value, status: false });
    inputElement.value = "";
    renderTodoList();
    document.getElementById('all').style.display = 'inline-block';
    document.getElementById('active').style.display = 'inline-block';
    document.getElementById('completed').style.display = 'inline-block';
    document.getElementById('clr').style.display = 'inline-block';
}

function createTodoUIElement(item, index) {
    const lineThrough = item.status ? 'line-through' : 'none';
    listElement.innerHTML += `<li>
        <input type="checkbox" onclick="completeTask(${index})" data-index="${item.id}" class="complete" ${item.status ? 'checked' : ''}>
        <span style="text-decoration: ${lineThrough};" >${item.task}</span>
        <button class="deleteTask" data=${item.id} onclick="deleteTask(${index})">X</button>
    </li>`;
}

function renderTodoList() {
    listElement.innerHTML = "";
    todos.forEach((item, index) => createTodoUIElement(item, index));
    updateCount();
   
}

function updateCount() {
    const activeCount = todos.filter((item) => !item.status).length;
    countElement.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

inputElement.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        if (inputElement.value === " " || inputElement.value === "") {
            alert("empty value!!")
        }
        else {
            addTodoItem(e.target.value);
        }
    }
});

function deleteTask(id) {
    todos.splice(id, 1);
    renderTodoList();
}

function completeTask(id) {
    todos[id].status = !todos[id].status;
    renderTodoList();
}

function showAll() {
    currentView = 'all';
    renderTodoList();
}

function showActive() {
    currentView = 'active';
    const activeTodos = todos.filter((item) => !item.status);
    listElement.innerHTML = "";
    activeTodos.forEach((item, index) => createTodoUIElement(item, index));
    updateCount();
}

function showCompleted() {
    currentView = 'completed';
    const completedTodos = todos.filter((item) => item.status);
    listElement.innerHTML = "";
    completedTodos.forEach((item, index) => createTodoUIElement(item, index));
    updateCount();
}

function clearCompleted() {
    todos = todos.filter((item) => !item.status);
    // renderTodoList();
    if (currentView == 'all') {
        showAll();
    } else if (currentView == 'active') {
        showActive();
    } else {
        showCompleted();
    }
}

function checkAll() {
    const allSelected = todos.every(item => item.status);
    todos.forEach(item => {
        item.status = !allSelected;
    });
    renderTodoList();
}

const categoryButtons = document.querySelectorAll('.options li button');
categoryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        categoryButtons.forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
    });
});       