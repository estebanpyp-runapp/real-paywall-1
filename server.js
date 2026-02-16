require('dotenv').config()

const express = require('express')
const createEvaluation = require('./api/create-evaluation')

const app = express()

app.use(express.json())

app.post('/api/create-evaluation', createEvaluation)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
