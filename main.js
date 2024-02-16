import { renderNotes } from "./app.js";

let title=document.querySelector(".title");
let note=document.querySelector(".note");
let addNoteButton=document.querySelector(".add-btn");
let notesDisplay=document.querySelector(".notes-display");
let showOtherNotes=document.querySelector(".notes-container");
let showPinnedNotes=document.querySelector(".pinned-notes-container");  

let pinTitle=document.querySelector(".pin-title");
let otherTitle=document.querySelector(".other-title");

let inicialLocalNotes=JSON.parse(sessionStorage.getItem("notes")); //parse a JSON string and convert it into a JavaScript object.
let arrayOfNotes=inicialLocalNotes||[];// if no data, please iniciate as an empty array

if(arrayOfNotes.length>0){
    pinTitle.classList.toggle("d-none");
    otherTitle.classList.toggle("d-none");
}

notesDisplay.addEventListener("click", (event)=>{
    let type=event.target.dataset.type;
    let noteId=event.target.dataset.id;
    let objNotes; 
    switch (type) {
        case "del":
            arrayOfNotes=arrayOfNotes.filter(({id})=> id.toString() != noteId)
            showOtherNotes.innerHTML=renderNotes(arrayOfNotes.filter(({isPinned})=>!isPinned));
            showPinnedNotes.innerHTML=renderNotes(arrayOfNotes.filter(({isPinned})=> isPinned));
            objNotes = JSON.stringify(arrayOfNotes);
            sessionStorage.setItem("notes", objNotes);
            break;
        
        case "pinned":
            arrayOfNotes=arrayOfNotes.map(note => note.id.toString() === noteId ? {... note, isPinned:!note.isPinned}:note);
           
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            showPinnedNotes.innerHTML=renderNotes(arrayOfNotes.filter(({isPinned})=>isPinned));// Notes such that isPinned = true            
           
            objNotes = JSON.stringify(arrayOfNotes);
            sessionStorage.setItem("notes", objNotes);
            break;

        case "archive":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note, isArchived: !note.isArchived} : note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            objNotes = JSON.stringify(arrayOfNotes);
            sessionStorage.setItem("notes", objNotes);
            break;

        default:
            break;
    }
})


addNoteButton.addEventListener("click",()=>{
    if(title.value.trim().length>0 || note.value.trim().length>0){
        arrayOfNotes=[... arrayOfNotes, 
            {
             id:Date.now(),
             title: title.value, 
             note:note.value, 
             isPinned:false,
             isArchived:false
            }];
            
        title.value=note.value="";
        
        showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
        const objNotes = JSON.stringify(arrayOfNotes);
        sessionStorage.setItem("notes", objNotes);
    }   
} )

showOtherNotes.innerHTML=renderNotes(arrayOfNotes.filter(({isPinned, isArchived})=> !isPinned && !isArchived));
showPinnedNotes.innerHTML=renderNotes(arrayOfNotes.filter(({isPinned})=>isPinned));