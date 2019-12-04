'use strict'
//start by searching for anything saved in local storage
let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited',
    

}

renderNotes(notes, filters)

document.querySelector("#create-note").addEventListener('click', (e) => {
    const id = uuidv4()
    
    //gives ms since epoch for the time right now(when note created)
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
    
    
})

//as user inputs text, notes will be re-rendered
//showing the notes that have passed the filter
document.querySelector("#search-text").addEventListener ('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})


//as the user selects from the dropdown menu
//the list will sort using sortNote function
//which is called in renderNotes
document.querySelector("#filter-by").addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})


//as the storage is changed
//parse the new data and set it equal to notes
//re-render the notes to show updates
//mostly doing this to re-render the notes titles to the user
window.addEventListener('storage', (e) => {
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
    

})

