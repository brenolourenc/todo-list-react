import './TodoListNotes.css'
import Header from '../components/TodoListHeader'
import Modal from '../components/TodoListModal'
import Note from '../components/TodoListNote'

import { useState, useRef } from 'react'
import AddIcon from '../assets/Add.svg'

function Notes() {
    // Pega a tarefa
    const getLocalItem = () => {
        let note = JSON.parse(localStorage.getItem('notes'))        
        return note ? note : []
    }
    // Seta a tarefa no banco
    const refresh = () => {
        localStorage.setItem('notes', JSON.stringify(note))
    }

    let [note, setNote] = useState(getLocalItem())  // Array das notas
    let [text, setText] = useState('')              // Pega o texto da note
    let [getID, setID] = useState('')               // Pega a id da nota
    let [getIndex, setIndex] = useState()           // Pega o indice da nota
    let [alt, setAlt] = useState()                  // Identifica se vai adicionar ou editar uma nota
    let key = Math.floor(Date.now() * Math.random()).toString(36)       // Gera uma ID aleatoria

    let dragItem = useRef()         // Pega referencia de dragItem
    let dragOverItem = useRef()     // Pega referencia de dragOverItem

    /// FUNÇÕES DE BLOCO
    const openOrClose = (choice, path, event) => {
        let Document = document.querySelector(path)
        if (choice === 'close') { Document.close() } else { Document.showModal() }
        if (choice === 'open' && event) { setID(getID = event.target.dataset.id) }
    }

    const ok = (pathInput, path) => {
        setText(text = document.querySelector(pathInput).value)
        document.querySelector(pathInput).value = ''
        document.querySelector(path).close()
    }

    /// FUNÇÕES DE FUNÇÃO
    const search = () => {
        note.forEach(item => {
                if (!item.text.includes(text)) { item.hidden = true }
                else { item.hidden = false }
        })
    }

    // Cria notas
    const createNote = () => {
        if (text !== '') {
            setNote(note = [...note, { id: key, text: text, hidden: false} ])
            setAlt('')
            refresh()
        }
    }

    // Edita notas
    const editNote = () => {
        // Impede que notas fiquem sem nomes
        if (text !== '') {
            note.forEach((i) => {
                // Edita uma nota em especifico
                if (getID === i.id) {
                    i.text = text
                    refresh()
                }
            })
        }
    }

    // Apaga Notas
    const delNote = () => {
        note.forEach((i) => {
            if (getID === i.id) {
                note.splice(getIndex, 1)
                refresh()
            }
        })
    }

    /// FUNÇÕES DE MODAL
    const openModal = (event) => {
        openOrClose('open', 'dialog#note', event)

        if (event.target.dataset.id === undefined) {
            setAlt( alt = event.target.title )
            document.querySelector('dialog#note input.note_name').value = ''
        } else {
            note.forEach( i => {
                if (getID === i.id) { document.querySelector('dialog#note input.note_name').value = i.text }
            })
        }
    }

    const openModalDel = () => { openOrClose('open', 'dialog#delNote') }

    const closeModal = () => { openOrClose('close', 'dialog#note') }

    const closeModalDel = () => { openOrClose('close', 'dialog#delNote') }

    const okModal = () => {
        ok('dialog#note input.note_name', 'dialog#note')
        if(alt.includes('Adicionar nota')) {
            createNote() 
        } else { editNote() }
    }

    const okModalDel = () => {
        ok('dialog#delNote input.none', 'dialog#delNote')
        delNote()
    }

    /// FUNÇÕES DE HANDLE
    // Permite mudar as notas de posição
    const handleDragDrop = (array) => {
        // Remove e salva o item arrastado
        let draggedItemContent = array.splice(dragItem.current, 1)[0]

        // Troca a posição
        array.splice(dragOverItem.current, 0, draggedItemContent)

        // Reseta as referencias
        dragItem.current = null
        dragOverItem.current = null

        // Salva no banco e atualiza
        refresh()
        location.reload()
    }

    // Handle para uso do clique esquerdo
    const handleLeftClick = (event) => {
        event.preventDefault()
        setText(text = event.target.textContent)
        setID(getID = event.target.dataset.id)

        // Pega o index
        note.map((i, idx) => { if(getID === i.id) { setIndex( getIndex = idx) } })
        openModalDel()
    }

    return (
        <div>
            <Header />
            <div className='container-notes'>
                <input 
                    className="search-note" 
                    type="search" 
                    onChange={ (event) => {
                        setText(text = event.target.value)
                        search()
                    }} 
                    placeholder='Procurar notas'/>
                <div>
                    <Note 
                        note={note} 
                        openModal={ openModal }
                        dragItem={ dragItem }
                        dragOverItem={ dragOverItem }
                        handleLeftClick={ handleLeftClick }
                        handleDragDrop={ handleDragDrop }
                    />
                </div>
                <button 
                    title='Adicionar nota' 
                    className='add-note' 
                    onClick={ openModal }>
                    <img    
                        src={AddIcon} 
                        alt="Adicionar nota" 
                        title='Adicionar nota'/>
                </button>
            </div>

            <Modal 
                modalClose={ closeModal } 
                modalOk={ okModal } 
                id={'note'} 
                name={'note_name'} 
                placeName={'Texto da nota'}
            />
            <Modal 
                modalClose={ closeModalDel } 
                modalOk={ okModalDel } 
                id={'delNote'} 
                name={'none'} 
                placeName={''} 
                inputHidden={ true }
                delMessage={`Deseja apagar a nota: '${ text }' ?`}
            />
        </div>
    )
}

export default Notes