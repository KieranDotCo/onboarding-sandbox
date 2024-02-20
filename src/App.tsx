import './App.css'
import Editor from './components/Editor/Editor'
import Onboarding from './components/Onboarding/Onboarding'
import Results from './components/Results/Results'
import { TitleMachineContext } from './machines/TitleMachine'

function App() {

  return (
    <TitleMachineContext.Provider>
      <div className="container">
        <Editor />
        <Onboarding />
        <Results />
      </div>
    </TitleMachineContext.Provider>
  )
}

export default App
