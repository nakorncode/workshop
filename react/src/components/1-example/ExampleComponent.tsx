import { useState } from 'react'

function ExampleComponent() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>Example Component</h1>
      <p>This is an example component.</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

export default ExampleComponent
