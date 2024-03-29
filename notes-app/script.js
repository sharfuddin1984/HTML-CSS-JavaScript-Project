const addBox = document.querySelector(".add-box");
 popupBox = document.querySelector(".popup-box"),
 popupTitle = popupBox.querySelector("header p"),
 closeIcon = popupBox.querySelector("header i"),
 titleTag = popupBox.querySelector("input"),
 descTag = popupBox.querySelector("textarea"),
 addBtn = popupBox.querySelector("button");

 const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//getting localstorage notes if exist and parsing them
 //to js object else passing an empty array to notes
 const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () =>{
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () =>{
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});

function showNotes(){    
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) =>{
        // console.log(note);
        let liTag = `<li class="note">
                    <div class="details">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                    </div>
                    <div class="bottom-content">
                        <span>${note.date}</span>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="menu">
                                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="uil uil-pen">Edit</li>
                                <li onclick="deleteNote(${index})" class="uil uil-trash">Delete</li>
                            </ul>
                        </div>
                    </div>
                </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    })
}
showNotes();

function showMenu(elem){    
    elem.parentElement.classList.add("show");

    document.addEventListener("click", e =>{
        //removing show class form the settings menu on document click
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}

//Delete note
function deleteNote(noteId){    
    let confirmDel = confirm("Are you sure you want to delete the note?");
    if(!confirmDel) return;
    //removing selected note from array/tasks
    notes.splice(noteId, 1);

    //updating notes to localstorage after delete
    localStorage.setItem("notes", JSON.stringify(notes));

    showNotes();
}

//Edit and Updata note
function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}


addBtn.addEventListener("click", e =>{
    e.preventDefault()
    let noteTitle = titleTag.value.trim(),
    noteDesc = descTag.value.trim();
    
    if(noteDesc || noteDesc){
        //getting month, day, year from the current date
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear()

        let noteIfo ={
            title:noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate){            
            //adding new note to notes
            notes.push(noteIfo);  
        }else{
            isUpdate = false;
            // updating specified note
            notes[updateId] = noteIfo;
        }

        //saving notes to localstorage
        localStorage.setItem("notes", JSON.stringify(notes)); 

        closeIcon.click();
        showNotes();
    }
});