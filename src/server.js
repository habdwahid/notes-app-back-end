import cors from 'cors'
import express from 'express'
import routes from './routes.js'

// Server configuration
const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0'

// Registering middlewares
app.use(cors({
  origin: '*'
}))

app.use(express.json())

app.use('/', routes)

// Server listener
app.listen(PORT, () => console.log(`Server is running at http://${HOST}:${PORT}`))