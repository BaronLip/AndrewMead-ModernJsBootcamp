// Retrieve todos from localStorage
const getSavedTodos = function() {
    const todosJSON = localStorage.getItem("todos")
    
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Saving todos to local storage.
const saveTodos = function(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Render the todos on filters.
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector("#todos").appendChild(generateSummaryDom(incompleteTodos))

    filteredTodos.forEach(function (todos) {
        document.querySelector("#todos").appendChild(generateTodoDom(todos));
    })
}


const generateTodoDom = function(todo) {
    const todoEl = document.createElement("div")
    
    const button = document.createElement("input")
    button.setAttribute("type", "checkbox")
    button.checked = todos.completed
    todoEl.appendChild(button)
    button.addEventListener("change", function(e) {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })


    const textEL = document.createElement("span")
    textEL.textContent = todos.text
    todoEl.appendChild(textEL)
    
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "delete"
    todoEl.appendChild(deleteButton)
    
    deleteButton.addEventListener("click", function(e) {
        removeTodoDom(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })

    return todoEl 
}


// Toggle todo completed function.
const toggleTodo = function(id) {
    const todo = todos.find(function (todo){
        return todo.id === id
    })

    if (todo !==undefined) {
        todo.completed = !todo.completed
    }
}


// Remove todo by using delete button.
const removeTodoDom = function (id) {
    const todosIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })

    if (todosIndex > -1) {
        todos.splice(todosIndex, 1)
    }
}

// Generate summary.
const generateSummaryDom = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)
    return summary
}


