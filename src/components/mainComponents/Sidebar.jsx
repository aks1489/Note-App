export default function Sidebar(props) {
    const theme = props.theme
    const date = props.notes.cereatedAt;
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div className={`title ${ note.id === props.currentNote.id ? "selected-note" : "" }`} onClick={() => props.setCurrentNoteId(note.id)} >
                <h4 className={`text-snippet ${theme}`}>{note.body.split("\n",1)[0]}</h4>
                <button 
                    className="delete-btn"
                    // Your onClick event handler here
                    onClick={() => props.deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className={`pane sidebar ${theme}`}>
            <div className="sidebar--header">
                <h3 className={theme}>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
