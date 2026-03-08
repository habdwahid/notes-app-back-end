import express from 'express'
import ErrorHandler from '../middlewares/error.js'

// Server init
const app = express()

// Registering middlewares
app.use(ErrorHandler) // Error handler middleware

export default app
