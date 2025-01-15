import { useState } from 'react'
import './App.css'
import GetAllCurrency from './Crypto/GetAllCurrency'
import Header from './Components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <GetAllCurrency />
    </>
  )
}

export default App
