import {AuthenticationError, InvariantError} from '../../../exceptions/index.js'
import TokenManager from '../../../security/token-manager.js'
import response from '../../../utils/response.js'
import UserRepositories from '../../users/repositories/user-repository.js'
import AuthenticationRepositories from '../repositories/authentication-repository.js'

const login = async (req, res, next) => {
  const {username, password} = req.validated
  const userId = await UserRepositories.verifyUserCredential(username, password)

  if (!userId) return next(new AuthenticationError('Username atau password salah'))
  
  const accessToken = TokenManager.generateAccessToken({id: userId})
  const refreshToken = TokenManager.generateRefreshToken({id: userId})

  await AuthenticationRepositories.createRefreshToken(refreshToken)

  return response(res, 201, 'Authentication berhasil ditambahkan', {accessToken, refreshToken})
}

const refreshToken = async (req, res, next) => {
  const {refreshToken} = req.validated

  const result = await AuthenticationRepositories.verifyRefreshToken(refreshToken)

  if (!result) return next(new InvariantError('Refresh token tidak valid'))

  const {id} = TokenManager.verifyRefreshToken(refreshToken)
  const accessToken = TokenManager.generateAccessToken({id})

  return response(res, 200, 'Access token berhasil diperbarui', {accessToken})
}

const logout = async (req, res, next) => {
  const {refreshToken} = req.validated

  const result = await AuthenticationRepositories.verifyRefreshToken(refreshToken)

  if (!result) return next(new InvariantError('Refresh token tidak valid'))

  await AuthenticationRepositories.deleteRefreshToken(refreshToken)

  return response(res, 200, 'Refresh token berhasil dihapus')
}

export {login, logout, refreshToken}
