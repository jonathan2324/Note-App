'use strict'
/* read, check, parse
fetch data from local storage
see if any data exists
and if the data exists, parse the data 
if nothing exists, return empty array 
*/

const getSavedNotes = () => {
    const notesJSON = localStorage.getItem("notes")

    try {
        return notesJSON ? JSON.parse(notesJSON) : []

    } catch (e) {

        return []
    }

}

//anytime saveNotes is called
//stringify the new notes and save them
//in local storage under the key called 'notes'
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from the list 
const removeNote =  (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    
    if (noteIndex > -1) {
        notes.splice(noteIndex,1)
    }
}

//Generate the DOM structure for a note 
const generateNoteDOM = (note) => {
    
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    // const button = document.createElement('button')

    // button.textContent = 'x'
    // noteEl.appendChild(button)
    // button.addEventListener('click', () => {
        
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })
    


    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add("list-item__title")
  
    noteEl.appendChild(textEl)

    //setup the link

    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add("list-item")

    //setup status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    
    


    return noteEl
}
//sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort ((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }   
        })
    } else if (sortBy === "alphabetical") {
        return notes.sort(( a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
    
     
}
//render application notes- shows user the most
//up to date list of notes with each re render
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    //innerHTML- set new HTML value- set to empty string 
    //this is because we dont want every key stroke from the
    //filters.searchText to re render a list of 
    //duplicate but filtered notes. 
    notesEl.innerHTML = ''
    
    if(filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            
            notesEl.appendChild(noteEl)
        })

    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = "No notes to show"
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }


}

//generated last edited message
//compares last updated time to time right now
const generateLastEdited = (timestamp) =>  {
    return `Last edited: ${moment(timestamp).fromNow()}`}


