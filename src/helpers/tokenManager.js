const JWT = require('jsonwebtoken'); 
require('dotenv/config');

const secret = process.env.JWT_SECRET;

class TokenManager {
  static expiresIn = '24h';

  static generateToken(payload){
    const jwtConfig = {
      expiresIn: TokenManager.expiresIn,
      algorithm: 'HS256',
    };
    return JWT.sign({ data: payload }, secret, jwtConfig);
  }

   static verifyToken(token) {
    if (!token) throw new Error('Token not found');
    const decoded = JWT.verify(token, secret);
    const { data } = decoded;
    return data;
  }
}

module.exports = TokenManager;
