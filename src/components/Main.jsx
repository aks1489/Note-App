import { useEffect, useState } from "react"
import Sidebar from "./mainComponents/Sidebar"
import Editor from "./mainComponents/Editor"
import Split from "react-split"
// import {nanoid} from "nanoid"
import {addDoc, deleteDoc, doc, onSnapshot, setDoc} from "firebase/firestore"
import { notesCollection, db } from "../../firebase"

export default function Main(props){
    const theme = props.theme
    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState("")
    console.log(notes)
    const currentNote = notes.find(note => { return note.id === currentNoteId }) || notes[0]
    const shortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

    useEffect(() => {
        // localStorage.setItem("notes",JSON.stringify(notes)) --------> saving the data from local storage
        const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
            // Sync up our local notes array with the snapshot data
            const newArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(newArr)
        })
        return unsubscribe
    }, [])
    useEffect(() => {
        if(!currentNoteId){
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    async function createNewNote() {  // ------< create new
        const newNote = {
            body: "# Type your markdown note's title here",
            cereatedAt: Date.now(),
            updatedAt: Date.now()
        }
        // setNotes(prevNotes => [newNote, ...prevNotes])
        const newNoteRef =  await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }
    
    //Note heading name setting and update to sidebar from firebase
    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId);
        await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
    }

    // Using Firebase deleting note >--------
    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId);
        await deleteDoc(docRef)
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
                    notes={shortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                    theme={theme}
                />
                <Editor 
                    currentNote={currentNote} 
                    updateNote={updateNote} 
                />
            </Split>
            :
            <div className={`no-notes ${theme}`}>
                <h1 className={theme}>You have no notes</h1>
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