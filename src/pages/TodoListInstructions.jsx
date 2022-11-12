import './TodoListInstructions.css'
import { useState} from 'react'
import Header from '../components/TodoListHeader'
import Guide from '../components/TodoListGuide'

import Editing from '../assets/Gifs/Editing.gif'
import Deleting from '../assets/Gifs/Deleting.gif'
import Moving from '../assets/Gifs/Moving.gif'

import EditImage from '../assets/Gifs/Edit.png'
import DeleteImage from '../assets/Gifs/Delete.png'
import MoveImage from '../assets/Gifs/Move.png'

function Instructions() {
    let [editStatic, altEditStatic] = useState(EditImage)
    let [deleteStatic, altDeleteStatic] = useState(DeleteImage)
    let [moveStatic, altMoveStatic] = useState(MoveImage)
    
    return (
        <div className='instructions'>
            <Header />
            <main>
                <h1>Intruções da todo-list</h1>
                <Guide
                    className="key-guide" 
                    h2="Comandos de atalho"
                    p="Quando o modal é aberto, podemos usar dois comandos através do teclado:"
                    list={
                        <ul>
                            <li> Tecla 'Enter' para confirmar o modal </li>
                            <li> Tecla 'Esc' para cancelar o modal </li>
                        </ul>
                    }/>
                <Guide
                    className="edit-guide"
                    h2="Editar"
                    p="Clique duas vezes no nome da tarefa/nota"
                    src={ editStatic } 
                    alt="Editando"
                    onMouseOut={ () => altEditStatic(EditImage) } 
                    onMouseOver={ () => altEditStatic(Editing) } 
                />
                <Guide
                    className="delete-guide"
                    h2="Apagar"
                    p="Use o botão direito do mouse no nome da tarefa/nota"
                    src={ deleteStatic } 
                    alt="Apagando"
                    onMouseOut={ () => altDeleteStatic(DeleteImage) } 
                    onMouseOver={ () => altDeleteStatic(Deleting) } 
                />
                <Guide
                    className="drag-drop-guide"
                    h2="Mudar posição"
                    p="Pressione o clique em uma tarefa/nota e arraste em outra para ocupar a posição dela"
                    src={ moveStatic } 
                    alt="Movendo"
                    onMouseOut={ () => altMoveStatic(MoveImage) } 
                    onMouseOver={ () => altMoveStatic(Moving) }
                />
            </main>
        </div>
    )
}

export default Instructions