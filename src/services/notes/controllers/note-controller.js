import {AuthorizationError, InvariantError, NotFoundError} from '../../../exceptions/index.js'
import response from '../../../utils/response.js'
import NoteRepositories from '../repositories/note-repository.js'

/**
 * Get all notes
 * 
 * @returns {JSON} response
 */
const getNotes = async (req, res) => {
  const {id: owner} = req.user

  const notes = await NoteRepositories.getNotes(owner)

  return response(res, 200, 'Catatan sukses ditampilkan', {notes})
}

/**
 * Add a new notes
 * 
 * @returns {JSON} response
 */
const createNote = async (req, res, next) => {
  const {title, body, tags} = req.validated
  const {id: owner} = req.user

  // Finding created note
  const note = await NoteRepositories.createNote({title, body, tags, owner})

  // Check if note fail to create
  if (!note) return next(new InvariantError('Catatan gagal ditambahkan'))

  // Otherwise return success
  return response(res, 201, 'Catatan berhasil ditambahkan', {noteId: note.id})
}

/**
 * Get note detail
 * 
 * @returns {JSON} response
 */
const getNoteById = async (req, res, next) => {
  const {id} = req.params
  const {id: owner} = req.user

  const isOwner = await NoteRepositories.verifyNoteAccess(id, owner)

  // Check if not the owner
  if (!isOwner) return next(new AuthorizationError('Anda tidak berhak mengakses resources ini'))

  // Finding note by id
  const note = await NoteRepositories.getNoteById(id)

  // Check if note not found
  if (!note) return next(new NotFoundError('Catatan tidak ditemukan'))

  // Otherwise return success
  return response(res, 200, 'Catatan sukses ditampilkan', {note})
}

/**
 * Update note data
 * 
 * @returns {JSON} response
 */
const updateNoteById = async (req, res, next) => {
  const {id} = req.params
  const {title, body, tags} = req.validated
  const {id: owner} = req.user

  const isOwner = await NoteRepositories.verifyNoteAccess(id, owner)

  // Check if not the owner
  if (!isOwner) return next(new AuthorizationError('Anda tidak berhak mengakses resources ini'))

  const note = await NoteRepositories.updateNoteById({id, title, body, tags})

  // Check if note not found
  if (!note) return next(new NotFoundError('Catatan tidak ditemukan'))
  
  // Otherwise return success
  return response(res, 200, 'Catatan berhasil diperbarui')
}

/**
 * Delete a note
 * 
 * @returns {JSON} response
 */
const deleteNoteById = async (req, res, next) => {
  const {id} = req.params
  const {id: owner} = req.user

  const isOwner = await NoteRepositories.verifyNoteOwner(id, owner)

  // Check if not the owner
  if (!isOwner) return next(new AuthorizationError('Anda tidak berhak mengakses resources ini'))

  const note = await NoteRepositories.deleteNoteById(id)

  // Check if note not found
  if (!note) return next(new NotFoundError('Catatan tidak ditemukan'))

  // Otherwise return success
  return response(res, 200, 'Catatan berhasil dihapus')
}

export {createNote, deleteNoteById, getNoteById, getNotes, updateNoteById}
