let form = document.querySelector(".fill")

async function request(method, endpoint, data = null) {
    let userId = btoa("natale:605292")
    const headers = {
        "content-Type": "application/json",
        "Authorization": `Basic 1234`
    };
    
    let options = {
        method: method,
        headers: headers,
    };

    if(method.toLowerCase() === "post") {
        options["body"] = JSON.stringify(data);
    }

    let request = await fetch(`http://bucks.local/${endpoint}`, options)

    if(request.ok) {
        let result = await request.json()
        return result;
    }
}

window.addEventListener("DOMContentLoaded", async function() {
    let result = await request("get", "course-todo", null);
    render(result.data) 
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    postTodo(event.target);
}) 

async function postTodo(form) {
    let formData = Object.fromEntries(new FormData(form));
    let result = await request("post", "course-todo", formData);
    render(result.data)
    form.reset()
}

let tasksContainer = document.querySelector(".tasks")

function render(todoList) {
    tasksContainer.innerHTML = todoList.map(courseTodo => {
        console.log(courseTodo)
        return`
        <ul>
        <li> ${courseTodo.course}, ${courseTodo.topic}, ${courseTodo.period}, ${courseTodo.todo}</li>
        <button data-todoid = "${courseTodo.id}" onclick = "deleteTodo(this)">Delete</button>
        </ul>
        `
    })
    .join("")
}

async function deleteTodo(button) {
    let todoId = button.dataset.todoid;
    let response = await request("delete", `course-todo/${todoId}`)
    render(response.data)
}
