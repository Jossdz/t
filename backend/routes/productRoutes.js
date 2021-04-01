const express = require('express')
const router = express.Router()
// hay que importar el modelo de productos para poder interactuar con la base de datos.
const Product = require('../models/Producto')
// Aca van nuestras rutas

//CRUD
// hacemos que la func sea capaz de manejar procesos asincronos
//                      👇
router.get('/products', async (req, res) => {
  // creamos una constante que guarda todos los products
  // esperando a que producto obtenga los resultados de la db
  const products = await Product.find()
  res.status(200).json(products)
})

router.get('/product/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.status(200).json(product)
})

router.post('/product', async (req, res) => {
  const { name, price, description, image } = req.body

  const product = await Product.create({
    name,
    description,
    price,
    image
  })

  res.status(200).json(product)
})

router.put('/product', (req, res) => {
  res.status(200).send('Editar producto')
})

router.delete('/product/:id', async (req, res) => {
  const { id } = req.params

  await Product.findByIdAndDelete(id)

  res.status(200).json({ message: 'Product deleted' })
})

module.exports = router
