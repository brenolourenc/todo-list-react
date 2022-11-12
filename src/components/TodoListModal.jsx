import './TodoListModal.css'

function Modal ({ modalClose, modalOk, id, name, placeName, inputHidden, delMessage }) {
    const handleSubmit = (event) => { event.preventDefault() }

    return (
        <dialog id={ id } style={{ 
            background: 'rgba(80, 120, 80, 100%)',
            border: 'none',
            borderRadius: '5px'
        }}>
            <form className='form-modal' onSubmit={ handleSubmit }>
                <p className='task-title'> { delMessage } {}</p>
                <input 
                    type="text" 
                    className={ name } 
                    placeholder={ placeName } 
                    hidden={ inputHidden } 
                />
                <div className='modal-btn'>
                    <input 
                        type="submit" 
                        value="Ok"
                        className='ok' 
                        onClick={ modalOk } 
                    />
                    <button className='cancel' onClick={ modalClose }> Cancelar </button>
                </div>
            </form>
        </dialog>
    )
}

export default Modal