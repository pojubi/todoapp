import { useEffect, useState } from "react"

function Calculator() {
    const [screenState, setScreenState] = useState([])
    const elementArray = []
    for(let i = 0; i <= 16; i++) {
        let symbol
        if(i === 10) {
            symbol = '+'
        }
        else if(i === 11) {
            symbol = '-'
        }
        else if(i === 12) {
            symbol = 'x'
        }
        else if(i === 13) {
            symbol = '÷'
        }
        else if(i === 14) {
            symbol = '←'
        }
        else if(i === 15) {
            symbol = 'C'
        }
        else if(i === 16) {
            symbol = '='
        }
        else {
            symbol = i.toString()
        }
        const element = {
            index: i,
            symbol: symbol
        }
        elementArray.push(element)
    }
    //console.log(elementArray)

    const writeToScreen = (e, index) => {
        e.preventDefault()
        let element = {
            index: index,
            symbol: ''
        }
        if(index === 10) {
            element.symbol = ' + '
        }
        else if(index === 11) {
            element.symbol = ' - '
        }
        else if(index === 12) {
            element.symbol = ' x '
        }
        else if(index === 13) {
            element.symbol = ' ÷ '
        }
        else if(index === 14) {
            element.symbol = '←'
        }
        else if(index === 15) {
            element.symbol = 'C'
        }
        else if(index === 16) {
            element.symbol = '='
        }
        else {
            element = elementArray[index]
        }
        setScreenState([...screenState, element])
    }

    useEffect(() => {

    }, [])

    return(
        <div className="App">
            <header className="App-header">
                <h3>Todo App</h3>
            </header>
            <main>
                <section id="instruction">
                    <div className="instructions">
                        <h3 className="instruction-header">Instructions</h3>
                        <p>Click the 'add todo' button to add a new task to your list of tasks</p>
                        <p>Click on each todo to view more information in a modal</p>
                        <p>Click 'reset' to reset your todo list</p>
                    </div>
                </section>
        
                <section id="dashboard">
                    <div className="calculator-screen">
                        {screenState.map((element, index) => 
                            <div key={index}>{element.symbol}</div>
                        )}
                    </div>
                    <div className="calculator-elements">
                        {elementArray.map((element, index) =>
                            <div key={index} onClick={e => writeToScreen(e, index)} className="calculator-element">{element.symbol}</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Calculator