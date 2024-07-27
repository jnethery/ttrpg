import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

// TODO: configure absolute imports
import Map from './components/Map'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </Router>
  )
}

export default App
