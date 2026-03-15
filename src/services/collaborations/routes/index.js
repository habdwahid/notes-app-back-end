import {Router} from 'express'
import authenticateToken from '../../../middlewares/auth.js'
import validate from '../../../middlewares/validate.js'
import {createCollaboration, deleteCollaboration} from '../controllers/collaboration-controller.js'
import collaborationPayloadSchema from '../validator/schema.js'

// Router init
const router = Router()

// Create collaboration route
router.post('/collaborations', authenticateToken, validate(collaborationPayloadSchema), createCollaboration)

// Delete collaboration route
router.delete('/collaborations', authenticateToken, validate(collaborationPayloadSchema), deleteCollaboration)

export default router
