import {Router} from 'express'
import validate from '../../../middlewares/validate.js'
import {login, logout, refreshToken} from '../controllers/authentication-controller.js'
import {deleteAuthenticationPayloadSchema, postAuthenticationPayloadSchema, putAuthenticationPayloadSchema} from '../validator/schema.js'

// Router init
const router = Router()

// Login route
router.post('/authentications', validate(postAuthenticationPayloadSchema), login)

// Refresh token route
router.put('/authentications', validate(putAuthenticationPayloadSchema), refreshToken)

// Logout route
router.delete('/authentications', validate(deleteAuthenticationPayloadSchema), logout)

export default router
