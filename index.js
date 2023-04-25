import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref , push , onValue , remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL:"https://mycart-84120-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const itemInDB = ref(database,"myCart")

// console.log(database)
// console.log(app)

const inputText = document.getElementById("input-field")
const buttonEl = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

onValue(itemInDB,function(snapshot){
    if(snapshot.exists()){
        console.log(Object.values(snapshot.val()))
    let actualList = Object.entries(snapshot.val());
    
    clearShoppingList();

    // for(let i=0;i<actualList.length;i++){
    //     let item = actualList[i]
    //     addToList(item)
    // }
    actualList.map((actualItem) => {
        //let currentItemID = al[0]
        //let currentItemValue = al[1]
        addToList(actualItem)
    })
    } else 
    {
        shoppingList.innerHTML = "No Items added yet.."
        
    }
    
})

buttonEl.addEventListener("click",function(){
    
    let inputValue = inputText.value
    
    if(inputValue === "")
    {
        alert("please enter some input..")
        return
    }

    push(itemInDB,inputValue)
    
    //Add item to list dynamically
    //addToList(inputValue);

    //get the values of Items get request
   

    console.log(`${inputValue} added to Database`);
    
    //reset the input
    reset()

})

// function getItemsFromDB(ref){
//     onValue(ref,function(snapshot){
//         console.log(snapshot)
//     })
// }

function reset(){
    inputText.value = "";
}

function addToList(actualItem){
    let itemID = actualItem[0]
    let itemValue = actualItem[1]
    // shoppingList.innerHTML += `<li>${inputValue}</li>`;
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    // remove element on dblclick
    newEl.addEventListener('click',function(){
        let exactItem = ref(database,`myCart/${itemID}`)
        //console.log(exactItem)
        remove(exactItem)
    })

    shoppingList.append(newEl)
}

function clearShoppingList(){
    shoppingList.innerHTML = ""
}
