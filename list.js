const taskinput = document.getElementById("task-input");
const todoslist = document.getElementById("todos-list");
const addbtn = document.querySelector(".btn");
const itemsleft = document.querySelector(".left");
const empty = document.querySelector(".empty-sate");
const filters = document.querySelectorAll(".filter");

let todos = [];
let currentfilter = "all";

addbtn.addEventListener("click", () => {
    addtodo(taskinput.value);
});

taskinput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addtodo(taskinput.value);
});

const addtodo = (text) => {
    if (text.trim() === "") return;
    
    const todo = {
        id: Date.now(),
        text,
        completed: false,
    };
    
    todos.push(todo);
    savetodo();
    rendertodos();
    taskinput.value = "";
}

function savetodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
    updateitemcount();
    checkemptystate();
}

function updateitemcount() {
    const uncompleted = todos.filter((todo) => !todo.completed);
    itemsleft.textContent = `${uncompleted?.length} item${uncompleted?.length !== 1 ? "s" : ""} left`;
}

function checkemptystate() {
    const filteredtodos = filtertodos(currentfilter);
    if (filteredtodos?.length === 0) {
        empty.classList.remove("hidden");
        todoslist.parentElement.classList.add("hidden");
    } else {
        empty.classList.add("hidden");
        todoslist.parentElement.classList.remove("hidden");
    }
}

function filtertodos(filter) {
    switch (filter) {
        case "active":
            return todos.filter((todo) => !todo.completed);
        case "completed":
            return todos.filter((todo) => todo.completed);
        default:
            return todos;
    }
}

function rendertodos() {
    todoslist.innerHTML = "";

    const filteredtodos = filtertodos(currentfilter);

    filteredtodos.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("to-do-item");
        if (todo.completed) todoItem.classList.add("completed");

        const checkboxContainer = document.createElement("label");
        checkboxContainer.classList.add("checkbox-cont");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggletodo(todo.id));

        const checkmark = document.createElement("span");
        checkmark.classList.add("checkmark");

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkmark);

        const todoText = document.createElement("span");
        todoText.classList.add("to-do-text");
        todoText.textContent = todo.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deletebt");
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.addEventListener("click", () => deletetodo(todo.id));

        todoItem.appendChild(checkboxContainer);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);

        todoslist.appendChild(todoItem);
    });

    checkemptystate();
}

function toggletodo(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    savetodo();
    rendertodos();
}

function deletetodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    savetodo();
    rendertodos();
}

function loadtodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) todos = JSON.parse(storedTodos);
    rendertodos();
}

filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        setactivefilter(filter.getAttribute("data-filter"));
    });
});

function setactivefilter(filter) {
    currentfilter = filter;

    filters.forEach((item) => {
        if (item.getAttribute("data-filter") === filter) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    rendertodos();
}

window.addEventListener("DOMContentLoaded", () => {
    loadtodos();
    updateitemcount();
    checkemptystate();
});