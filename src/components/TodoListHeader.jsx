import './TodoListHeader.css'
import InstructionIco from '../assets/Instruction.png'
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <nav>
                <ul>
                    <Link to="/"><li className='header-element'> Tarefas </li></Link>
                    <Link to="/Instructions">
                        <li className='header-element'>
                            <img className='instructionIco' src={ InstructionIco } alt="Instruções" />
                        </li>
                    </Link>
                    <Link to="/Notes"><li className='header-element'>Notas</li></Link>
                </ul>
            </nav>
        </div>
    )
}

export default Header