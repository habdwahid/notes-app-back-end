import {Router} from 'express'
import authentications from '../services/authentications/routes/index.js'
import collaborations from '../services/collaborations/routes/index.js'
import notes from '../services/notes/routes/index.js'
import users from '../services/users/routes/index.js'

// Router init
const router = Router()

// Note routes
router.use('/', notes)

// User routes
router.use('/', users)

// Authentication routes
router.use('/', authentications)

// Collaboration routes
router.use('/', collaborations)

export default router
