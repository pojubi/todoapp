import { useEffect, useState, useRef } from "react"

function Calculator() {
    const [screenState, setScreenState] = useState([])
    const [expression, setExpression] = useState([])
    const [total, setTotal] = useState(0)
    const [isEmpty, setIsEmpty] = useState(null)
    const [screenChanged, setScreenChanged] = useState(null)
    const [left, setLeft] = useState()
    const [right, setRight] = useState()
    const [operator, setOperator] = useState(null)
    const [finalExpression, setFinalExpression] = useState()
    const totalRef = useRef(null)


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

        if(index === 14 || index === 15) {
            if(index === 14) {
                clearLast()
            }
            if(index === 15) {
                clearScreen()
            }
        }

        
        let element = ''

        if(index === 10) {
            element = '+'
            setScreenState([...screenState, element])
        }
        else if(index === 11) {
            element = '-'
            setScreenState([...screenState, element])
        }
        else if(index === 12) {
            element = 'x'
            setScreenState([...screenState, element])
        }
        else if(index === 13) {
            element = '÷'
            setScreenState([...screenState, element])
        }
        else if(index === 14) {
            //console.log(screenState)
            return
        }
        else if(index === 15) {
            //console.log(screenState)
            return
        }
        else if(index === 16) {
            element = '='
        }
        else {
            element = elementArray[index].symbol
            setScreenState([...screenState, element])
        }

        
        setExpression([...expression, element])
        
    }

    const clearLast = () => {
        screenState.pop()
        expression.pop()
        expression.pop()
        setScreenState([...screenState])
        setExpression([...expression])

        if(screenState.length === 0) {
            setIsEmpty(true)
            setTotal(0)
        }
        else {
            setIsEmpty(false)
        }
    }

    const clearScreen = () => {
        setScreenState([])
        setExpression([])
        setTotal(0)
    }

    const result = Function("return " + finalExpression)()
    

    

    useEffect(() => {
        const multiply = (a, b) => {
            return a * b
        }
    
        const divide = (a, b) => {
            return a / b
        }
    
        const add = (a, b) => {
            return a + b
        }
    
        const subtract = (a, b) => {
            return a - b
        }

        const getTotal = () => {
            if(operator === '+') {
                return add(left, right)
            }
            else if(operator === '-') {
                return subtract(left, right)
            }
            else if(operator === 'x') {
                return multiply(left, right)
            }
            else if(operator === '÷') {
                return divide(left, right)
            }
            else {
                return
            }
        }

        const evaluate = () => {
            let operatorIndex
            if(expression.includes('+')) {
                operatorIndex = expression.indexOf('+')
                setOperator('+')
            }
            else if(expression.includes('-')) {
                operatorIndex = expression.indexOf('-')
                setOperator('-')
            }
            else if(expression.includes('x')) {
                operatorIndex = expression.indexOf('x')
                setOperator('x')
            }
            else {
                operatorIndex = expression.indexOf('÷')
                setOperator('÷')
            }

            if(expression.includes('=')) {
                const expressionArr = Array.from(expression)
                expressionArr.pop()
                const noEqualitySign = expressionArr
                for (let e of noEqualitySign) {
                    if(e === 'x') {
                        noEqualitySign[noEqualitySign.indexOf(e)] = '*'
                    }
                    if(e === '÷') {
                        noEqualitySign[noEqualitySign.indexOf(e)] = '/'
                    }
                }
                const string = noEqualitySign.join('')
                //const result = parseInt(string)
                setFinalExpression(string)
                console.log(expressionArr)
                console.log(noEqualitySign)
                console.log(string)
                console.log(result)
            }
        }

        if(screenState.length === 0) {
            setIsEmpty(true)
        }
        else {
            setIsEmpty(false)
        }

        if(expression.length !== 0) {
            evaluate()
        }

        if(finalExpression) {
            setTotal(result)
        }

        //console.log(expression)
    }, [isEmpty, screenState, screenChanged, left, right, total, expression, operator, finalExpression])

    return(
        <div className="App">
            <header className="App-header">
                <h3>Todo App</h3>
            </header>
            <main>
                <section id="calculator-instruction">
                    <div className="instructions">
                        <h3 className="instruction-header">Instructions</h3>
                        <p>Click the 'add todo' button to add a new task to your list of tasks</p>
                        <p>Click on each todo to view more information in a modal</p>
                        <p>Click 'reset' to reset your todo list</p>
                    </div>
                </section>
        
                <section id="calculator">
                    <div className="calculator-screen">
                        <div className="expression-screen">
                            {isEmpty ? null : screenState.map((element, index) => 
                                <div key={index}>{element}</div>
                            )}
                        </div>
                        <div ref={totalRef} className="total-screen">{total.toString()}</div>
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