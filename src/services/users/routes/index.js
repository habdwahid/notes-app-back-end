import {Router} from 'express'
import validate from '../../../middlewares/validate.js'
import {createUser, getUserById} from '../controllers/user-controller.js'
import userPayloadSchema from '../validator/schema.js'

// Router init
const router = Router()

// Add a new user route
router.post('/users', validate(userPayloadSchema), createUser)

// Get user details route
router.get('/users/:id', getUserById)

export default router
