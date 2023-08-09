export default function Todo(props) {
    const showDescription = () => {

    }

    return (
        <>
            
            <p className="todo-description" onClick={showDescription}>{props.description}</p>
        </>
        
    )
}