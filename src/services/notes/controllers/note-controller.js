import {nanoid} from 'nanoid'
import {InvariantError, NotFoundError} from '../../../exceptions/index.js'
import response from '../../../utils/response.js'
import {notes} from '../notes.js'

/**
 * Get all notes
 * 
 * @returns {JSON} notes
 */
const getNotes = (req, res) => {
  return res.json({
    status: 'success',
    data: {notes}
  })
}

/**
 * Add a new notes
 * 
 * @returns {JSON} notes
 */
const createNote = (req, res, next) => {
  const {title = 'Untitled', tags, body} = req.validated
  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  // Collect all variable into new note
  const newNote = {id, title, createdAt, updatedAt, tags, body}

  // Push a new note into notes array data
  notes.push(newNote)

  // Finding created note
  const isSuccess = notes.filter(note => note.id === id)

  // Check if note fail to create
  if (!isSuccess) return next(new InvariantError('Catatan gagal ditambahkan'))

  // Otherwise return success
  return response(res, 201, 'Catatan berhasil ditambahkan', {noteId: id})
}

/**
 * Get note detail
 * 
 * @param {String} notes
 * @returns {JSON} notes
 */
const getNoteById = (req, res, next) => {
  const {id} = req.params

  // Finding note by id
  const note = notes.find(note => note.id === id)

  // Check if note not found
  if (!note) return next(new NotFoundError('Catatan tidak ditemukan'))

  // Otherwise return success
  return response(res, 200, 'Catatan sukses ditampilkan', {note})
}

/**
 * Update note data
 * 
 * @param {String} id
 * @returns {JSON} notes
 */
const updateNoteById = (req, res, next) => {
  const {id} = req.params
  const {title, tags, body} = req.validated
  const updatedAt = new Date().toISOString()

  // Finding note index
  const index = notes.findIndex(note => note.id === id)

  // Check if note index not found
  if (index === -1) return next(new NotFoundError('Catatan tidak ditemukan'))
  
  notes[index] = {...notes[index], title, updatedAt, tags, body}

  // Otherwise return success
  return response(res, 200, 'Catatan berhasil diperbarui')
}

/**
 * Delete a note
 * 
 * @param {String} id
 * @returns {JSON} note
 */
const deleteNoteById = (req, res, next) => {
  const {id} = req.params

  // Finding note index
  const index = notes.findIndex(note => note.id === id)

  // Check if note index not found
  if (index === -1) return next(new NotFoundError('Catatan tidak ditemukan'))

  notes.splice(index, 1)

  // Otherwise return success
  return response(res, 200, 'Catatan berhasil dihapus')
}

export {createNote, deleteNoteById, getNoteById, getNotes, updateNoteById}
