import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import ErrorHandler from '../middlewares/error.js'
import routes from '../routes/index.js'

// Server init
const app = express()

// Registering middlewares
app.use(cors()) // CORS middleware
app.use(express.json()) // JSON middleware
app.use(routes) // Routes
app.use(ErrorHandler) // Error handler middleware

export default app
