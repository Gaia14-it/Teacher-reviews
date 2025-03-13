let form = document.querySelector(".fill")

async function request(method, endpoint, data = null) {
    let userId = btoa("natale:605292")
    const headers = {
        "content-Type": "application/json"
        "Authorization": `Basic ${userId}`
    };
    
    let options = {
        method: method,
        headers: headers,
    };

    if(method.toLowerCase() === "post") {
        options["body"] = JSON.stringify(data);
    }

    // let request = await fetch()

    if(request.ok) {
        let result = await request.json()
        return result;
    }
}

window.addEventListener("DOMContentLoaded", async function() {
    let result = await request("get", "todo", null);
    render(result.data) 
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    postTodo(event.target);
}) 