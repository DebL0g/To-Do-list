//change view 
//count items 
//check tasks
//add task 
//move task 

const taskinput = document.getElementsById("task-input");
const todoslist = document.getElementById("todos-list");
const addbtn = document.querySelector("btn");
const itemsleft = document.querySelector("left");
const empty = document.querySelector("empty-sate");
const filters = document.querySelectorAll(".filter");

let todos = [];
let currentfilter = "all";

addbtn.addEventListener("click", () => {
    Addtodo(taskinput.value);

});

taskinput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") addtodo = (taskinput.value);
});

const addtodo = (text) => {

    if (text.trim() === "") return;
    const todo = {
        id: Date.now(),
        text,
        completed: false,
    };
    savetodo();
    rendertodos();
    taskinput.value = "";
}

function savetodo() {
    localStorage.setItem = ("todos", JSON.stringify(todos));
    updateitemcount();
    scheckemptystate();


};
function updateitemcount() {
    const uncompleted = todos.filter((todo) => !todo.completed);
    itemsleft.textContent = '${uncompleted?.length} item${uncompleted?.length!==1?"s";""}Left';

};

function scheckemptystate() {

    const filteredtodos = filtertodos(currentfilter);
    if (filteredtodos?.lenght === 0) empty.classList.remove("hidden");
    else empty.classList.add("hidden");
};

function filtertodos() {
    switch (filter) {
        case "active":
            return filtertodos((todo) => !todo.completed);

        case "completed":
            return filtertodos((todo) => todo.completed);
        default:
            return todo;
    }
}
function renderTodos() {
  todosList.innerHTML = "";

  const filteredTodos = filterTodos(currentFilter);

  filteredTodos.forEach((todo) => {
    
    const todoItem = document.createElement("li");
    todoItem.classList.add("to-do-item");
    if (todo.completed) todoItem.classList.add("completed");

  
    const checkboxContainer = document.createElement("label");
    checkboxContainer.classList.add("checkbox-cont");

  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

   
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
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    
    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteBtn);

   
    todosList.appendChild(todoItem);
  });

  checkEmptyState();
}





