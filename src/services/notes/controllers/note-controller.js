import {nanoid} from 'nanoid'
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
  const {title = 'Untitled', tags, body} = req.body
  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  // Collect all variable into new note
  const newNote = {id, title, createdAt, updatedAt, tags, body}

  // Push a new note into notes array data
  notes.push(newNote)

  // Finding created note
  const isSuccess = notes.filter(note => note.id === id)

  // Check if note created
  if (isSuccess) return res.json({
    status: 'success',
    message: 'Catatan berhasil ditambahkan',
    data: {noteId: id}
  })

  // Otherwise return fail
  return res.status(500).json({
    status: 'error',
    message: 'Catatan gagal untuk ditambahkan'
  })
}

/**
 * Get note detail
 * 
 * @param {String} notes
 * @returns {JSON} notes
 */
const getNoteById = (req, res) => {
  const {id} = req.params

  // Finding note by id
  const note = notes.find(note => note.id === id)

  // Check if note found
  if (note) return res.json({
    status: 'success',
    data: {note}
  })

  // Otherwise return fail
  return res.status(404).json({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
}

/**
 * Update note data
 * 
 * @param {String} id
 * @returns {JSON} notes
 */
const updateNoteById = (req, res) => {
  const {id} = req.params
  const {title, tags, body} = req.body
  const updatedAt = new Date().toISOString()

  // Finding note index
  const index = notes.findIndex(note => note.id === id)

  // Check if note index found
  if (index !== -1) {
    notes[index] = {...notes[index], title, updatedAt, tags, body}

    return res.json({
      status: 'success',
      message: 'Catatan berhasil diperbaharui'
    })
  }

  // Otherwise return fail
  return res.status(404).json({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan'
  })
}

/**
 * Delete a note
 * 
 * @param {String} id
 * @returns {JSON} note
 */
const deleteNoteById = (req, res) => {
  const {id} = req.params

  // Finding note index
  const index = notes.findIndex(note => note.id === id)

  // Check if note index found
  if (index !== -1) {
    notes.splice(index, 1)

    return res.json({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    })
  }

  // Otherwise return fail
  return res.status(404).json({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id catatan tidak ditemukan'
  })
}

export {createNote, deleteNoteById, getNoteById, getNotes, updateNoteById}
