import server from './server/index.js'

// Server configuration
const PORT = process.env.PORT
const HOST = process.env.HOST

// Server listener
server.listen(PORT, () => console.log(`Server is running at http://${HOST}:${PORT}`))
