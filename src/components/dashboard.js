import { useState, useEffect, useRef } from "react"
import Todo from "./todo"
import Message from "./message"

export default function Dashboard() {
    const [todoList, setTodoList] = useState([])
    const [listIsEmpty, setListIsEmpty] = useState(null)
    const [todoTitle, setTodoTitle] = useState('')
    const [todoDescription, setTodoDiscription] = useState('')
    const [modalIndex, setModalIndex] = useState(null)
    const [index, setIndex] = useState(null)
    const [todoRemoved, setTodoRemoved] = useState(false)
    const [todoAdded, SetTodoAdded] = useState(false)
    const [todoStatusUpdated, setTodoStatusUpdated] = useState(false)
    const messageRef = useRef(null)
    const modalRef = useRef(null)

    const closeModal = () => {
        //setModalIndex(null)
        modalRef.current.style.display = "none"
    }

    const showMessage = () => {
        messageRef.current.style.display = "block"
        setTimeout(closeMessage, 3000)
        clearTimeout()
    }

    const closeMessage = () => {
        messageRef.current.style.display = "none"
    }

    const openModal = (event, index) => {
        event.preventDefault()
        const num = index + 1
        setModalIndex(num)
        setIndex(num - 1)
        modalRef.current.style.display = "block"
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dateTime = new Date()
        const date = dateTime.toLocaleDateString()
        const time = dateTime.toLocaleTimeString()
        
        let slug
        if(todoTitle.length > 40) {
            slug = todoTitle.slice(0, 40) + '...'
        }
        else {
            slug = todoTitle.slice()
        }

        const todoData = {
            slug: slug,
            title: todoTitle,
            description: todoDescription,
            status: 'Uncompleted',
            createdOn: date,
            createdAt: time
        }
        setTodoList([...todoList, todoData])
        SetTodoAdded(true)
        setTodoStatusUpdated(false)
        setTodoRemoved(false)
        showMessage()
    }

    const updateTodoTitle = async (e) => {
        setTodoTitle(e.target.value)
        //setTodo({...todo, title: todoTitle})
    }

    const updateTodoDescription = async (e) => {
        setTodoDiscription(e.target.value)
        //setTodo({...todo, description: todoDescription})
    }

    const reset = (e) => {
        e.preventDefault()
        setTodoList([])
    }

    const updateStatus = (event, index) => {
        event.preventDefault()
        for(const t of todoList) {
            if(todoList.indexOf(t) === index) {
                if(t.status === 'Uncompleted') {
                    t.status = 'Completed'
                }
                else {
                    t.status = 'Uncompleted'
                }

                setTodoList([...todoList])
                setTodoStatusUpdated(true)
                setTodoRemoved(false)
                SetTodoAdded(false)
                showMessage()
            }
        }
        
        if(todoList.length === 0) {
            setListIsEmpty(true)
        }
    }

    const removeTodo = (event, index) => {
        event.preventDefault()
        todoList.splice(index, 1)
        setTodoList([...todoList])
        setTodoRemoved(true)
        SetTodoAdded(false)
        setTodoStatusUpdated(false)
        showMessage()
        if(todoList.length === 0) {
            setListIsEmpty(true)
        }
        modalRef.current.style.display = "none"
        console.log(todoList)
    }


    useEffect(() => {
        if(todoList.length === 0) {
            setListIsEmpty(true)
        }
        else {
            setListIsEmpty(false)
        }
        console.log(todoList)
        console.log(modalIndex)
    }, [listIsEmpty, todoList, todoAdded, todoRemoved, todoStatusUpdated])


    return (
        <>
            <h3>Dashboard</h3>
            <div ref={messageRef} className="message">
                {
                    todoAdded ? 'Todo added successfully, cheers !' :
                    todoRemoved ? 'Todo successfully removed !' :
                    todoStatusUpdated ? 'Todo status successfully updated !' :
                    null
                }
            </div>
            <form onSubmit={handleSubmit} id="todo-form">
                <label htmlFor="todo">Title</label><br/>
                <input type="text" id="todoTitle" name="todo" placeholder="Add todo" defaultValue={todoTitle} required onChange={updateTodoTitle}/><br/>
                <br/>
                <label htmlFor="story">Description</label><br/>
                <textarea id="todoDescription" name="story" rows="6" cols="33" defaultValue={todoDescription} required onChange={updateTodoDescription}></textarea>
                <div className="control-buttons">
                    <button type='submit' className="control-button">Add Todo</button>
                    <button type='button' onClick={reset} className="control-button">Reset</button>
                </div>
            </form>

            
            {
                listIsEmpty ? 
                <p>You have no todos yet !</p> :
                <div className="todo-list-box">
                    <p>You have {todoList.length} in total</p>
                    <div>
                        <div className="todo-list-heading">
                            <div>Todo</div>
                            <div>Status</div>
                        </div>
                        {todoList.map((todo, index) =>
                            <div key={index}>
                                <div className="todo" onClick={event => openModal(event, index)}>
                                    <div>{todo.slug}</div>
                                    <div>{todo.status}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div ref={modalRef} className="modal">
                        <div onClick={closeModal} className="modal-closure">X</div>
                        <div className="modal-header">Todo Information</div>
                        {listIsEmpty ? null :
                            <div className="modal-content">
                                <div className="modal-child">Title<br/><span>{modalIndex ? todoList[index].title : null}</span></div>
                                <div className="modal-child">Status<br/><span>{modalIndex ? todoList[index].status : null}</span></div>
                                <div className="modal-child">Description<br/><span>{modalIndex ? todoList[index].description : null}</span></div>
                                <div className="modal-child">Created on<br/><span>{modalIndex ? todoList[index].createdOn : null}</span></div>
                                <div className="modal-child">CreatedAt<br/><span>{modalIndex ? todoList[index].createdAt : null}</span></div>
                                <div className="todo-control-buttons">
                                    <button onClick={event => updateStatus(event, index)} className="todo-control-button">Update Status</button>
                                    <button onClick={event => removeTodo(event, index)} className="todo-control-button">Remove</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}