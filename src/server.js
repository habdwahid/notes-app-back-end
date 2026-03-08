import server from './server/index.js'

// Server configuration
const PORT = process.env.PORT || 3000
const HOST = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0'

// Server listener
server.listen(PORT, () => console.log(`Server is running at http://${HOST}:${PORT}`))
