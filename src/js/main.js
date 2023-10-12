import * as BS from 'bootstrap'
// Import our custom CSS
import '../scss/styles.scss'

const form = document.getElementById("client-form")
////Form submit
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = e.target.elements[0].value
    const email = e.target.elements[1].value
    console.log({ name, email});
    const response = await fetch("http://localhost:5555/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        body: JSON.stringify({name, email})
    })

    if (response.status === 200) {
        window.location.reload()
    }
})

///Logic run when html document fully loads
document.addEventListener('DOMContentLoaded', async () => {
    const users = await fetch("http://localhost:5555/users")
    const usersJson = await users.json()
    console.log(usersJson);

    const table = document.getElementById('table')

    usersJson.forEach(user => {
        const row = createTableRow(user)
        console.log({ user });
        table.getElementsByTagName('tbody')[0].appendChild(row)
    })
    
})

async function deleteClient(id) {
    const response = await fetch(`http://localhost:5555/users/${id}`, {
        method: "DELETE"
    })
    
    if (response.status === 200) {
        window.location.reload()
    }
}


function createTableRow(user) {
    const {_id, name, email} = user
    const tr = document.createElement('tr')
    const tdId = document.createElement('td')
    const tdName = document.createElement('td')
    const tdEmail = document.createElement('td')
    const tdAction = document.createElement('td')

    tdId.textContent = _id
    tdName.textContent = name
    tdEmail.textContent = email

    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.addEventListener('click', () => {
        deleteClient(_id)
    })
    button.textContent = "Delete"
    tdAction.appendChild(button)

    tr.appendChild(tdId)
    tr.appendChild(tdName)
    tr.appendChild(tdEmail)
    tr.appendChild(tdAction)

    return tr
}


