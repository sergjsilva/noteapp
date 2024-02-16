import { renderNotes } from "./app.js";

let inicialLocalNotes=JSON.parse(sessionStorage.getItem("notes")); //parse a JSON string and convert it into a JavaScript object.
let arrayOfNotes=inicialLocalNotes||[];// if no data, please iniciate as an empty array

console.log(arrayOfNotes);

let showArchiveNotes=document.querySelector(".archive-notes");

showArchiveNotes.addEventListener("click",(event)=>{
    let type=event.target.dataset.type;
    let noteId=event.target.dataset.id;
    
    console.log(type);

    switch (type) {
        case "del":
            arrayOfNotes=arrayOfNotes.filter(({id})=> id.toString() != noteId);
            showArchiveNotes.innerHTML=renderNotes(arrayOfNotes.filter(({isArchived})=>isArchived));
            sessionStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        
        case "archive":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note, isArchived: !note.isArchived} : note);
            showArchiveNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isArchived}) => isArchived));
            sessionStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;

        default:
            break;
    }

    
})

showArchiveNotes.innerHTML=renderNotes(arrayOfNotes.filter(({isArchived})=>isArchived));