import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'

import { Map } from 'components/Map'

const darkTheme = createTheme({
  spacing: [0, 5, 10],
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
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
