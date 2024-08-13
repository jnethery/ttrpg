import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'

import { Map } from 'components/Map'
import { Lab } from 'components/Lab'

const darkTheme = createTheme({
  spacing: (factor: number) => `${5 * factor}px`,
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFEE58',
    },
    secondary: {
      main: '#5869ff',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Map context={'world'} />} />
          <Route path="/lab" element={<Lab />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
