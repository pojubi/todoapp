import Dashboard from '../components/dashboard'
import Instruction from '../components/instructions'

function Home() {
    return(
        <div className="App">
            <header className="App-header">
                <h3>Todo App</h3>
                <nav>
                    <button className='nav-button'><a href={'/calculator'}>Calculator</a></button>
                </nav>
            </header>
            <main>
                <section id="instruction">
                    <Instruction />
                </section>
        
                <section id="dashboard">
                    <Dashboard />
                </section>
            </main>
        </div>
    )
}

export default Home