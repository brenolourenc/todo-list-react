
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Tasks from './pages/TodoListTasks'
import Instructions from './pages/TodoListInstructions'
import Notes from './pages/TodoListNotes'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Tasks /> } />
                <Route path='/Instructions' element={ <Instructions /> } />
                <Route path='/Notes' element={ <Notes /> } 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
