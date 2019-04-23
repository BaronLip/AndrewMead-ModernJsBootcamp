const getSavedTodos = function() {
    const todosJSON = localStorage.getItem("todos")
    
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}


const saveTodos = function(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
}


const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        debugger
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
    const p = document.createElement("p");
    p.textContent = todos.text
    return p
}



const generateSummaryDom = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)
    return summary
}
