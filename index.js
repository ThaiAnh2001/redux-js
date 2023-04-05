const {createStore} = window.Redux
const initialState = [
]

const todoReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'ADD_TODO': {
            const newTodo = [...state];
            newTodo.push(action.payload);
            return newTodo
        }
        case 'DELETE_TODO':{
            const newTodo = [...state]
            newTodo.splice(action.payload, 1)
            return newTodo
        }

        case 'DELETE_ALL': {
            const newTodo = []
            return newTodo
        }
        default: {
            return state
        }
    }
}

const store = createStore(todoReducer)

const renderTodoList = (todoList) => {
    if(!Array.isArray(todoList)) return;
    const todoListElement = document.getElementById("todo-list")
    if(!todoListElement) return;
    todoListElement.innerHTML = ""
    for(let index in todoList) {
        const divElement = document.createElement("div")
        const nameTimeElement = document.createElement("div")
        nameTimeElement.className= "name-time"
        const nameElement = document.createElement("p")
        const timeElement = document.createElement("p")
        const inputElement = document.createElement('input')

        nameElement.innerHTML = todoList[index].name
        timeElement.innerHTML = todoList[index].time
        divElement.className = 'todo-item'
        divElement.style.background = `${(todoList[index].prior == 1 && "linear-gradient(450deg, #00FFFF, #87CEFA)") || (todoList[index].prior == 2 && "linear-gradient(450deg, #FFD700, #FFFF00)") || (todoList[index].prior == 3 && "linear-gradient(450deg, #FF0000, #FA8072)")}`
        inputElement.type = "checkbox"
        todoListElement.appendChild(divElement)
        divElement.appendChild(inputElement)
        divElement.appendChild(nameTimeElement)
        nameTimeElement.appendChild(nameElement)
        nameTimeElement.appendChild(timeElement)
        
        const deleteElement = document.createElement("i");
        deleteElement.addEventListener('click', (e) => {
            const action = {
                type: "DELETE_TODO",
                payload: index,
            }
            store.dispatch(action)
        })
        deleteElement.className= "far fa-times-circle delete-todo"
        deleteElement.id= "delete-icon"
        divElement.appendChild(deleteElement)
    }
}
const todoList = store.getState()
renderTodoList(todoList)

const formElement = document.getElementById('form__control')
const nameElement = document.getElementById("name")
const timeElement = document.getElementById("time")
const priorElement = document.getElementById("todo")
if (formElement) {
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(!nameElement.value) {
            nameElement.style.border="1px solid red"
            return;
        } else {
            nameElement.style.border="1px solid #1E90FF"
        }
        if(!timeElement.value) {
            timeElement.style.border="1px solid red"
            return;
        } else {
            timeElement.style.border="1px solid #1E90FF"
        }
        const action = {
            type: 'ADD_TODO',
            payload: {
                id: todoList.length,
                name: nameElement.value,
                time: timeElement.value,
                prior: priorElement.value,
            },
        };
        store.dispatch(action);
        formElement.reset();
    }
    formElement.addEventListener('submit', handleSubmitForm)
}

const deleteAllElement = document.getElementById("delete-all")
if(deleteAllElement) {
    const handleDeleteAllTodo = (e) => {
        e.preventDefault();
        console.log("hello")
        const action = {
            type: "DELETE_ALL",
        }
        store.dispatch(action)
    };
    deleteAllElement.addEventListener('click', handleDeleteAllTodo)
}


if(todoList.length !== 0) {
    console.log("hello")
}

store.subscribe(() => {
    const todoList = store.getState();
    console.log(todoList)
    renderTodoList(todoList);
});