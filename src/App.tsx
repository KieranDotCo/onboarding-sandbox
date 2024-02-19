import './App.css'
import Editor from './components/Editor/Editor'
import Onboarding from './components/Onboarding/Onboarding'
import Results from './components/Results/Results'

function App() {

  return (
    <div className="container">
      <Editor/>
      <Onboarding/>
      <Results/>
    </div>
  )
}

export default App
