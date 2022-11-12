import './TodoListGuide.css'

function Guide({ className, h2, p, src, alt, onMouseOut, onMouseOver, list }) {

    return (
        <>
            <section className={ className }>
                <h2> { h2 } </h2>
                <p> { p } </p>
                <img 
                        onMouseOut={ onMouseOut } 
                        onMouseOver={ onMouseOver } 
                        src={ src } 
                        alt={ alt }
                />
                { list }
            </section>
        </>
        
    )
}

export default Guide