import {Router} from 'express'
import notes from '../services/notes/routes/index.js'

// Router init
const router = Router()

router.use('/', notes)

export default router
