import './TodoListNote.css'

function Note({ 
    note,
    openModal,
    dragItem,
    dragOverItem,
    handleLeftClick,
    handleDragDrop
}) {

    return (
        note.map((item, index) => (
            <div 
                style={ item.hidden === true ? { display: 'none'} : { display: 'flex'}}
                className="note-container" 
                key={ index }
                draggable
                onDragStart={() => dragItem.current = index}
                onDragEnter={() => dragOverItem.current = index}
                onDragEnd={() => handleDragDrop(note)}
                onDragOver={ (event) => event.preventDefault()}>
                <p 
                    contentEditable={ item.editable }
                    className='note-text'
                    onDoubleClick={ openModal }  
                    onContextMenu={ handleLeftClick }
                    data-id={ item.id }> 
                    { item.text } 
                </p>
            </div>
        ))
    )
}

export default Note