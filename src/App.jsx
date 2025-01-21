import { useState } from 'react'
import './App.css'
import GetAllCurrency from '../src/Components/Crypto/GetAllCurrency'
import Header from './Components/Header'
import Pagination from './Components/Pagination'
import './/Components/pagination.css'

function App() {
  const [count, setCount] = useState(0)
  let abc = [1,2,45,6,11]
  return (
    <>
      <Header />
      <GetAllCurrency />
    </>
  )
}

export default App
