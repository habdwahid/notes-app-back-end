import express from 'express'
import validate from '../../../middlewares/validate.js'
import {createNote, deleteNoteById, getNoteById, getNotes, updateNoteById} from '../controllers/note-controller.js'
import notePayloadSchema from '../validator/schema.js'

// Router initialization
const router = express.Router()

// Add a new note route
router.post('/notes', validate(notePayloadSchema), createNote)

// Get all notes route
router.get('/notes', getNotes)

// Get note details by id route
router.get('/notes/:id', getNoteById)

// Update note data by id route
router.put('/notes/:id', validate(notePayloadSchema), updateNoteById)

// Delete a note by id route
router.delete('/notes/:id', deleteNoteById)

export default router
