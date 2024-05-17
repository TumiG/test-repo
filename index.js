import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-3-fd720-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

console.log(app)

const inputFieldEl = document.getElementById("input-field")
const addbuttonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addbuttonEl.addEventListener("onclick", function () {
    console.log('hits')
    let inputValue = inputFieldEl.value 

    push(shoppingListInDB, inputValue)

    clearInputField()

    
})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
    clearShoppingListEl()

    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[i]
        
        appendItemToShoppingListEl(currentItem)
    }
 } else {
    shoppingListEl.innerHTML = "No items here... yet"

    }
    

    

})

function clearShoppingListEl () {
    shoppingListEl.innerHTML = ""
}

function clearInputField() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl (item) {
   
    let itemID = item[0]
    let itemValue = item[i]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    newEl.addEventListener("click", function() {

        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        this.remove(exactLocationOfItemInDB)
        
    })

    shoppingListEl.append(newEl)
}