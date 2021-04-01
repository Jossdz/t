import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get('http://localhost:3000/api/products')
      setProducts(data)
    }

    getProducts()
  }, [])

  return (
    <div>
      <h1>Tiendita</h1>
      <hr />
      {/* optional chaining -> ?. */}
      {products?.map(product => (
        <div>
          <p>
            <b>{product.name}</b>
          </p>
          <img src={product.image} width='300' height='300' alt='product' />
        </div>
      ))}
    </div>
  )
}

export default App
