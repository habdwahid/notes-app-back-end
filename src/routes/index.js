import {Router} from 'express'
import collaborations from '../services/collaborations/routes/index.js'
import notes from '../services/notes/routes/index.js'
import users from '../services/users/routes/index.js'

// Router init
const router = Router()

// Note routes
router.use('/', notes)

// User routes
router.use('/', users)

// Collaboration routes
router.use('/', collaborations)

export default router
