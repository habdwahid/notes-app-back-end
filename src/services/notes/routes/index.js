import express from 'express'
import {createNote, deleteNoteById, getNoteById, getNotes, updateNoteById} from '../controllers/note-controller.js'

// Router initialization
const router = express.Router()

// Add a new note route
router.post('/notes', createNote)

// Get all notes route
router.get('/notes', getNotes)

// Get note details by id route
router.get('/notes/:id', getNoteById)

// Update note data by id route
router.put('/notes/:id', updateNoteById)

// Delete a note by id route
router.delete('/notes/:id', deleteNoteById)

export default router
