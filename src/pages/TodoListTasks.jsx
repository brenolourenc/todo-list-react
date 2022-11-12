import './TodoListTasks.css'
import { useState, useEffect, useRef } from 'react'

import Modal from '../components/TodoListModal'
import Header from '../components/TodoListHeader'
import Task from '../components/TodoListTask'
import AddIcon from '../assets/Add.svg'

function Tasks() {
    // Pega a tarefa
    const getLocalItem = () => {
        let list = JSON.parse(localStorage.getItem('tasks'))        
        return list ? list : []
    }
    // Seta a tarefa no banco
    const refresh = () => {
        localStorage.setItem('tasks', JSON.stringify(task))
    }

    let [task, setTask] = useState(getLocalItem())  // Array das tarefas
    let [text, setText] = useState('')              // Pega o nome da tarefa
    let [getID, setID] = useState('')               // Pega a id da tarefa
    let [getIndex, setIndex] = useState()           // Pega o indice da tarefa
    let [alt, setAlt] = useState()                  // Ao adicionar, identifica se é tarefa ou subtarefa
    let [check, setCheck] = useState()              // Atualiza a marcação da tarefa
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

    const markFunction = (condition, status, boolean, set) => {
        if (condition) {
            status.status = boolean
            setCheck( check = set.status )
            refresh()
        }
    }

    /// FUNÇÕES DE FUNÇÃO
    const search = () => {
        task.forEach(item => {
                if (!item.name.includes(text)) { item.hidden = true }
                else { item.hidden = false }
        })
    }

    // Cria as tarefas
    const createTask = () => {
        if (text !== '') {      // Impede que tarefas sem nome sejam criadas
            if (alt === "Adicionar tarefa") {
                setTask(task = [...task, {id: key, name: text, status: false, subtask:[], hidden: false}] )
                setAlt('')
                refresh()
            }
            // Cria subtarefas
            else if (alt === "Adicionar subtarefa") {
                task.forEach((item) => {
                    // Adiciona subtarefa para uma tarefa especifica
                    if (getID === item.id) {
                        item.subtask.push({id: key, name: text, status: false })
                        // Desmarca a tarefa, caso esteja marcada
                        markFunction(item.subtask.some(i => i.status === false), item, false, item)
                        setAlt('')
                        refresh()
                    }
                })
            }
        }
    }

    // Edita tarefas
    const editTask = () => {
        if (text !== '') {      // Impede que tarefas fiquem sem nomes
            task.forEach((i) => {
                // Edita uma tarefa em especifico
                if (getID === i.id) {
                    i.name = text
                    refresh()
                }
                i.subtask.forEach(item => {
                    // Edita uma subtarefa em especifico
                    if (getID === item.id) {
                        item.name = text     
                        refresh()                  
                    }
                })
            })
        }
    }

    // Salva o status da tarefa
    const markTask = (event) => {
        setID(getID = event.target.dataset.id)
        
        task.forEach((i) => {
            // Atualiza o status de uma tarefa
            if (getID === i.id) {
                i.status = !i.status
                setCheck( check = i.status)
                refresh()
            }
            i.subtask.forEach(item => {
                // Atualiza o status de uma subtarefa
                
                if (getID === item.id) {
                    item.status = !item.status
                    setCheck( check = item.status)
                    refresh()
                    // Se houver subtarefa desmarcada, desmarca a tarefa principal
                    markFunction(i.subtask.some(item => item.status === false), i, !i, item)
                }
                // Quando a tarefa é marcada, suas subtarefas serão marcadas
                markFunction(i.status === true, item, true, item)
                // Marca a tarefa quando todas as subtarefas são marcadas
                markFunction(i.subtask.every( item => item.status === true), i, true, item)
                
                
            })
        })
    }

    // Apaga tarefas
    const delTask = () => {
        task.forEach((i) => {
            if (getID === i.id) {
                task.splice(getIndex, 1)
                refresh()
            }
            i.subtask.forEach(item => {
                if (getID === item.id) {
                    i.subtask.splice(getIndex, 1)
                    refresh()
                }
            })
        })
    }

    /// FUNÇÕES DE MODAL
    // Abre o modal
    const openModal = (event) => {
        openOrClose('open', 'dialog#task', event)

        if (event.target.title) {                                   
            setAlt( alt = event.target.title )                        //
            document.querySelector('dialog#task input.task_name').value = ''
        }
        else {
            task.forEach( i => {
                if (getID === i.id) { document.querySelector('dialog#task input.task_name').value = i.name }
                i.subtask.forEach(item => {
                    if (getID === item.id) { document.querySelector('dialog#task input.task_name').value = item.name }
                })
            })
        }
    }

    const openModalDel = () => { openOrClose('open', 'dialog#del') }

    // Fecha o modal
    const closeModal = () => { openOrClose('close', 'dialog#task') }

    const closeModalDel = () => { openOrClose('close', 'dialog#del') }

    // Confirma o modal
    const okModal = () => {
        ok('dialog#task input.task_name', 'dialog#task')
        if (alt === "Adicionar tarefa" || alt === "Adicionar subtarefa") {
            createTask() 
        } else { editTask() }
    }

    const okModalDel = () => {
        ok('dialog#del input.none', 'dialog#del')
        delTask()
    }

    /// FUNÇÕES DE HANDLE
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
        document.location.reload()
    }

    // Handle para uso do clique esquerdo
    const handleLeftClick = (event) => {
        event.preventDefault()
        setText(text = event.target.textContent)
        setID(getID = event.target.dataset.id)

        // Pega o index
        task.map((i, idx) => {
            if (getID === i.id) { setIndex( getIndex = idx) }

            i.subtask.forEach((item, index) => {
                if (getID === item.id) { setIndex( getIndex = index) }
            })
        })
        openModalDel()
    }

    return (
        <div>
            <Header />
            <div className='container-task'>
                <input 
                    className="search-task" 
                    type="search" 
                    onChange={ (event) => {
                        setText(text = event.target.value)
                        search()
                    }} 
                    placeholder='Procurar tarefas'/>
                <Task
                    task={ task } 
                    openModal={ openModal }
                    handleLeftClick={ handleLeftClick }
                    markTask={ markTask } 
                    dragItem={ dragItem }
                    dragOverItem={ dragOverItem }
                    handleDragDrop={ handleDragDrop }
                />
                <button title='Adicionar tarefa' onClick={ openModal } className='add-task'>
                    <img src={ AddIcon } title="Adicionar tarefa" alt="Adicionar tarefa" />
                </button>
            </div>

            <Modal 
                modalClose={ closeModal } 
                modalOk={ okModal } 
                id={'task'} 
                name={'task_name'} 
                placeName={'Nome da tarefa'} 
            />
            <Modal 
                modalClose={ closeModalDel } 
                modalOk={ okModalDel } 
                id={'del'} 
                name={'none'} 
                placeName={''} 
                inputHidden={ true }
                delMessage={`Deseja apagar a tarefa: '${ text }' ?`}
            />
        </div>
    )
}

export default Tasks