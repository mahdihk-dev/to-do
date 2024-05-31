"use strict"

// Variables
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const btns = document.querySelector(".btns")
const addBtn = document.querySelector(".add")
const deleteBtn = document.querySelector(".delete")
const listBtn = document.querySelector(".list")

const addForm = document.querySelector(".add-form")
const title = document.querySelector(".title")
const description = document.querySelector(".description")
const status = document.querySelectorAll(".stat")
const submit = document.querySelector(".submit")

const listForm = document.querySelector(".list-form")
const emptyText = document.querySelector(".empty")

/////////////////////////////////////////////////////

// Data classes
class Item {
  date = new Date()

  constructor(title, description, status) {
    this.title = title
    this.description = description
    this.status = status
  }
}

//////////////////////////////////////////////////////
// App class

class App {
  #items = []
  #status

  constructor() {
    // Functions
    this.#getLocalStorage()

    if (this.#items.length === 0) {
      emptyText.classList.remove("hidden")
    }

    // Attach event handlers
    addBtn.addEventListener("click", this.#showAddForm.bind(this))
    addForm.addEventListener("submit", this.#getDatas.bind(this))
    listBtn.addEventListener("click", this.#showForm.bind(this))
    deleteBtn.addEventListener("click", this.#reset)
  }

  #showAddForm() {
    listForm.classList.add("hidden")
    addForm.classList.remove("hidden")
    title.focus()
    document.body.style.height = "100vh"
  }

  #getDatas(e) {
    let item
    e.preventDefault()

    if (!title.value || !description.value)
      return alert("Please Fill out all The Sections !")

    this.#whichOne()
    item = new Item(title.value, description.value, this.#status.value)
    this.#items.push(item)
    this.#addItems(item)
    this.#setLocalStorage()
    this.#clearInputs()
    title.focus()
  }

  #whichOne() {
    status.forEach((elm) => {
      if (elm.checked) {
        this.#status = elm
      }
    })
  }

  #clearInputs() {
    title.value = ""
    description.value = ""
  }

  #showForm() {
    listForm.classList.remove("hidden")
    addForm.classList.add("hidden")
    this.#clearInputs()
    document.body.style.height = "100%"
    if (this.#items.length > 0) {
      emptyText.classList.add("hidden")
    }
  }

  #addItems(item) {
    let html = `
        <div class="list-item ${
          item.status === "regular" ? "list-item--green" : ""
        }">
            <div>
                <h3 class="list-title">${item.title} Added on ${
      months[item.date.getMonth()]
    } ${item.date.getDate()} at ${item.date.getHours()}:${item.date.getMinutes()}</h3>
                <p class="list-desc">${item.description}</p>
            </div>
            <div class="list-status ${
              item.status === "regular"
                ? "list-status--green"
                : "list-status--red"
            }"></div>
        </div>`

    listForm.insertAdjacentHTML("afterbegin", html)
  }

  #setLocalStorage() {
    // localStorage api
    localStorage.setItem("items", JSON.stringify(this.#items))
  }
  #getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("items"))

    if (!data) return

    this.#items = data
    this.#items.forEach((it) => {
      it.date = new Date(Date.parse(it.date))
      this.#addItems(it)
    })
  }

  #reset() {
    // removing from localStorage browser
    localStorage.removeItem("items")

    // location object is a huge object with lots of methods and ability to reload the page
    location.reload()
  }
}

const app = new App()
