import './TodoListSubtask.css'

function Subtask({ 
            subtask, 
            openModal, 
            markTask,
            handleLeftClick,
            dragItem,
            dragOverItem,
            handleDragDrop
    }) {
        
    return (
        <div>
            {subtask.map((item, index) => (
                <div 
                    className="subtask-info" 
                    key={ index }
                    draggable
                    onDragStart={() => dragItem.current = index}
                    onDragEnter={() => dragOverItem.current = index}
                    onDragEnd={ () => handleDragDrop(subtask) }
                    onDragOver={ (event) => event.preventDefault()}>
                    <input 
                        type="checkbox" 
                        data-id={ item.id } 
                        onChange={ markTask } 
                        checked={ item.status } 
                    />
                    <p 
                        data-id={ item.id } 
                        onDoubleClick={ openModal } 
                        onContextMenu={ handleLeftClick }
                        className={ item.status === false ? 'title-subtask' : 'complete-subtask' }> 
                        { item.name } 
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Subtask