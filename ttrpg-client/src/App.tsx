import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'

// import { Map } from 'components/Map'
import { Lab } from 'components/Lab'
import { List } from 'components/List'

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

const mainElement = <List /> // <Map context={'world'} />

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/" element={mainElement} />
          <Route path="/lab" element={<Lab />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
