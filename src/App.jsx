import { useState } from 'react'
import './App.css'
import GetAllCurrency from '../src/Components/Crypto/GetAllCurrency'
import Header from './Components/Header'
import Pagination from './Components/Pagination'
import './/Components/pagination.css'
import Include from './Components/Include'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <GetAllCurrency />
      <Pagination/>
      <Include/>
    </>
  )
}

export default App
