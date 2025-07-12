
/* This line sets up the get element by ID in the HTML file
The const declaration declares block-scoped local variables. The value of a constant can't be changed through reassignment using the assignment operator, but if a constant is an object, its properties can be added, updated, or removed.
The variable name is set here as 'inputBox' and the element ID is the ID set in the HTML file.
*/
const inputBox = document.getElementById("input-box");

/* This line sets up the get element by ID in the HTML file
The variable name is set here as 'listContainer' and the element ID is the ID set in the HTML file - in this case, 'list-container'.
*/
const listContainer = document.getElementById("list-container");

/* This line references the button onclick="addTask()" function call to run the following function */

function addTask() {

/* This first part of the 'if, else' function is saying if the value of the variable 'inputBox' defined above is nothing (denoted by the '===') – in other words in the HTML page, the element with id 'input-box' has no value, then display an alert that says "You must write something here!" */
    if(inputBox.value === ''){
        alert("You must write something here!");
    }

/* This second part of the 'if, else' function is saying for anything else i.e. there is a value in the 'input-box' field then the first line creates a new list (li) item, which is stored in the li variable... */
    else {   let li = document.createElement("li");

/* Then this line sets the innerHTML of the list element to be equal to the value of the const variable 'inputBox', which takes the current value from the 'input-box' field. */
        li.innerHTML = inputBox.value;

/* Check if the input already exists in the array */
        const listItems = document.querySelectorAll("#list-container li");
        const array = Array.from(listItems, item => item.textContent);
        
        if (array.includes(inputBox.value + "\u00d7")) {
        alert("That text already exists. Please enter a different text string.");
        }

        console.log(array)

/* This line identifies the 'listContainer' variable defined above in this file, which is related to the 'list-container' id in the HTML document, and it adds a new child item to the list (li) - hence you could go on forever adding new child items unless you set a limit */
        listContainer.appendChild(li);

/* This line creates a new variable 'span' which creates a new tag element in the HTML document called 'span' which is appended after the new child element above in 'listContainer' */
        let span = document.createElement("span");

/* This line creates the cross icon within (innerHTML) the 'span' tag element using the code \u00d7 which is the code for the cross icon  */
        span.innerHTML = "\u00d7";

/* This line simply adds the new tags and icon - like this <span>\u00d7</span> - on to the end of the 'li' tag row before the final '</li>' tag. Of course we also need to style the <span> tag in the CSS file so it displays in the front end correctly */
        li.appendChild(span);
    }

/* This line ensures the variable 'inputBox' is set back to none so that the 'input-box' element in the HTML is reset */
    inputBox.value = "";

/* This line calls the 'saveData()' function which starts on line 65 of this doc and will ensure that each time a new item is added to the list it is saved */
    saveData();
}

/* Add an event listener for a click on a list item */

/* This line ensures that whenever there is a click on the 'listContainer' (where all the instances of the tasks are stored) i.e. 'list-container' in the HTML, the eventListener detects the click...  */
listContainer.addEventListener("click", function(e){

/* This line detects if the target of the click was the 'li' tag and if so, toggles to the 'checked' (green tick icon)... */
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");

/* This line calls the 'saveData()' function which starts on line 65 of this doc and will ensure that each time an item is ticked, this will be saved */
        saveData();
    }

/* If the target is not 'li' tag, but rather the 'span' tag which contains the cross icon, then this part of the script removes the element instead. Obviously if neither the 'li' or 'span' tags are clicked then nothing happens as false will be returned in all other cases */
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();

/* This line calls the 'saveData()' function which starts on line 65 of this doc and will ensure that each time an item is deleted, it will be removed from the locally saved items */
        saveData();
    }
}, false);

/* This line creates a new function and we have called it 'saveData' */
function saveData(){

/* This line sets the local browser storage to be called 'data' and it is populated from the HTML within the 'listContainer' variable (that is, the content (inner HTML) of list-container on the front end) */
    localStorage.setItem("data", listContainer.innerHTML);
}

/* This function retrieves the list items that are saved to the local browser storage */
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

/* This line ensures that the saved local list items that are saved to the local browser storage are retrieved for display */
showTask();

