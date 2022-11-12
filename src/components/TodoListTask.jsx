import './TodoListTask.css'
import Subtask from './TodoListSubtask'
import AddIcon from '../assets/Add.svg'

function Task({ 
            task, 
            openModal, 
            handleLeftClick,
            markTask, 
            dragItem,
            dragOverItem,
            handleDragDrop
    }) {
        
    return (
        <div className="todo-container">
            {task.map((item, index) => (
            <div className="todo" key={ index } style={ item.hidden === true ? { display: 'none'} : { display: 'flex'}}>
                <div className='task'>
                    <div
                        className="task-info"
                        draggable
                        onDragStart={() => dragItem.current = index}
                        onDragEnter={() => dragOverItem.current = index}
                        onDragEnd={() => handleDragDrop(task) }
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
                            className={ item.status === false ? 'title-task' : 'complete-task' } 
                            style={ {fontWeight: 'bold'} }> 
                            { item.name } 
                        </p>
                        
                    </div>
                    <Subtask 
                        subtask={ item.subtask } 
                        openModal={ openModal } 
                        markTask={ markTask }
                        handleLeftClick={ handleLeftClick }
                        dragItem={ dragItem }
                        dragOverItem={ dragOverItem }
                        handleDragDrop={ handleDragDrop }
                    />
                </div>
                <button 
                    data-id={ item.id } 
                    title='Adicionar subtarefa' 
                    onClick={ openModal } 
                    className='add-sub'>
                    <img 
                        data-id={ item.id } 
                        title='Adicionar subtarefa' 
                        src={ AddIcon } 
                        alt="Adicionar subtarefa"
                    />
                </button>
            </div>
        ))}
        </div>
    )
}

export default Task