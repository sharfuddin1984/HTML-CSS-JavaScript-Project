const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("you must write something!");
    }
    else{
        //create li element and apend text value on list.
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);    

        //create x tag and append it on span tag 
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";    
        li.appendChild(span);
    }
    inputBox.value = "";
    inputBox.focus();
    saveData();
}

//Checked and uncked on click of list and remove the list item click on close icon
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

//Save to do list in local storage on browser
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

//Display data evern referesh or close the browser
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();