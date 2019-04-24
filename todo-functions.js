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


const generateTodoDom = function(todos) {
    const todoEl = document.createElement("div")
    
    const button = document.createElement("input")
    button.setAttribute("type", "checkbox")
    // button.type = "checkbox" should also work.
    todoEl.appendChild(button)
    
    const textEL = document.createElement("span")
    textEL.textContent = todos.text
    todoEl.appendChild(textEL)
    
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "delete"
    todoEl.appendChild(deleteButton)

    return todoEl 
}


const generateSummaryDom = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)
    return summary
}


