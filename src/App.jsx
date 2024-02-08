import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  const [ darkTheme , setDarkTheme ] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

  function handleTheme() {
    setDarkTheme(prvtheme => !prvtheme)
  }
  const theme = darkTheme === true ? "dark" : null
  return (
    <div className='container'>
        <Header theme={theme} handleTheme={handleTheme}/>
        <Main theme={theme}/>
        <Footer theme={theme}/>
    </div>
  )
}

export default App
