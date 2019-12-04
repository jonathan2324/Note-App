'use strict'
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')

//get the noteId by taking it from URL using substring to
//cut off hash
const noteId = location.hash.substring(1)
let notes = getSavedNotes()

//get the specific note from the notes array
//that we want to adjust in the edits page
//by selecting by note.id
let note = notes.find((note) => note.id === noteId)

//if note does not exist, kick user to main index page
if (!note) {
    location.assign('/index.html')
} 

//set the title, body and date elements
titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

//if title is edited, updare note.title
//update note.updatedAt
//generate last edited message
//save notes to local storage
titleElement.addEventListener('input', (e) => {
    note.title = e.target.value

    //gives time since epoch from time when note updated
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
    
})
bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

//remove using note.id
//save notes and kick back to index page
removeElement.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign("/index.html")

})

//fires an event when storage is changed
window.addEventListener('storage', (e) => {
    //if the value being adjusted has a key 'notes'
    //set notes and parse with the newValue for that key
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)
        
        if (!note) {
            location.assign('/index.html')
        } 
        
        //once the new note is found using id
        //set the initial values for the elements
        //by accessing the values on the object. 
        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt)
    }
       

})