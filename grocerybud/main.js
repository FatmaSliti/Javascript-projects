//completed on 10/04/2023 at 05:50 PM
//*********SELECT ITEMS ***********

const alertt = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

//edit option
let editElement;
let editFlag = false; // by default we will not edit 
let editID = "";

//*********** EVENT LISTENERS ***********
//SUBMIT form
form.addEventListener("submit", addItem);
//clear items
clearBtn.addEventListener('click', clearItems);
//load items
window.addEventListener('DOMContentLoaded', setupItems);

//************ FUNCTIONS ************

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    //if (value !== "" && editFlag === false)
    if (value && !editFlag) {
        creactedListItem(id, value)
        // display alert 
        displayAlert('item added to the list', 'success');
        // show container (cuz it's hidden by default)
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        //edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert('please enter value', 'danger')
    }
}

// display alert
function displayAlert(text, action) {
    alertt.textContent = text;
    alertt.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(function () {
        alertt.textContent = "";
        alertt.classList.remove(`alert-${action}`)
    }, 1000)
}

//clear items
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        })
    }
    container.classList.remove("show-container");
    displayAlert('empty list', "danger"); // danger is the class preceded by an alert to indicate the color red or green
    setBackToDefault();
    // when we click on the clear items button we will delete the list of items from the local Storage
    localStorage.removeItem('list');
}

//delete function 
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    // once we have the ID we can remove it from the local storage
    removeFromLocalStorage(id);
}

//edit function 
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

// set back to default
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// ********* LOCAL STORAGE *********
function addToLocalStorage(id, value) {
    //const grocery = { id: id, value: value }; in ES6 it becomes this one :
    const grocery = { id, value };
    // we invoked the getLocalStorage built below
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    // in this function we will get all the items , filter them (the one which don't match the id will not be returned and ultimately we will save the new items returned by the filter method in the local storage)

    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id != id) {
            return item;
        }
    });
    //after removing the item we will set it in the localStorage
    //we are using json.stringify cuz the local storage store only strings so that we use stringify to parse it to string and then we use the parse method to reconvert it to a js object. 
    localStorage.setItem("list", JSON.stringify(items));
}

//This is the editID not the ID creacted with the date constructor
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

// we built it as a separated function cuz we will reuse it later many times
function getLocalStorage() {
    //if there is a list of items apply the parse method to reconvert it to a js object otherwise return an empty array
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem('list')) : [];
}

// localStorage API
//setItem
//getItem
// remove Item
//save as Strings


// localStorage.setItem('orange',JSON.stringify(["item", "item2"]));
// const oranges = JSON.parse(localStorage.getItem("orange"));
// console.log(oranges);
// localStorage.removeItem("orange");

// ********* SETUP ITEMS ***********

function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function (item) {
            creactedListItem(item.id, item.value)
        })
        container.classList.add('show-container');
    }
}

function creactedListItem(id, value) {
    const element = document.createElement('article');
    //add class
    element.classList.add('grocery-item');
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>`;
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
    // append child
    list.appendChild(element);
}