import TokenManager from '../security/token-manager.js'
import response from '../utils/response.js'

/**
 * Validity access token
 */
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization

  // Check if token exist
  if (token && token.indexOf('Bearer ') !== -1) {
    try {
      const user = await TokenManager.verifyRefreshToken(token.split('Bearer ')[1], process.env.ACCESS_TOKEN_KEY)

      req.user = user
      return next()
    } catch (error) {
      return response(res, 401, error.message)
    }
  }

  return response(res, 401, 'Unauthorized')
}

export default authenticateToken
