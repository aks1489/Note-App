import { useEffect, useState } from "react"
import Sidebar from "./mainComponents/Sidebar"
import Editor from "./mainComponents/Editor"
import { data } from "../assets/data"
import Split from "react-split"
import {nanoid} from "nanoid"

export default function Main(){
    const [notes, setNotes] = useState( () => JSON.parse(localStorage.getItem("notes")) || [])
    const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || "")

    useEffect(() => {
        localStorage.setItem("notes",JSON.stringify(notes))
    }, [notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    //Note update and update to top
    function updateNote(text) {
        setNotes(oldNotes =>  {
            const newArray = []
            for(let i = 0; i<oldNotes.length; i++){
                const oldNote = oldNotes[i];
                if(oldNote.id === currentNoteId){
                    newArray.unshift({...oldNote, body: text})
                }else{
                    newArray.push(oldNote)
                }
            }
            return newArray;
        })
    }

    // Not gonna rearrange itself  <------
    // function updateNote(text) {
    //     setNotes(oldNotes => oldNotes.map(oldNote => {
    //         return oldNote.id === currentNoteId ? { ...oldNote, body: text } : oldNote
    //     }))
    // }
    
    function deleteNote(event, noteId) {
        event.stopPropagation()
        //  deleting a specific note 
        // console.log(`Succesfuly deleted ${noteId}`) ////-----> uncomment to see the deleted note id
        setNotes((prvArray) => prvArray.filter((note => note.id !==  noteId)))
    }

    function findCurrentNote() {
        return notes.find(note => { 
            return note.id === currentNoteId 
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}