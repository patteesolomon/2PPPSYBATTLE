import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // add 2 to count
  function countUp(arg0: number) {
    setCount(arg0 + (2))
  }
  

  return (
    <>
      {/* <button onClick={() => { countUp(count) }}>{count} + 2</button>
      <button onClick={() => setCount((count) => count + 1)}>Mami {count} +1</button> */}
    </>
  )
}

export default App
