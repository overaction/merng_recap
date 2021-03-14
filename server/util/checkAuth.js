const { AuthenticationError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/keys');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        // Bearer
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            }
            catch(err) {
                throw new AuthenticationError('유효하지 않은 토큰입니다')
            }
        }
        else {
            throw new Error('인증 토큰이 필요합니다 Bearer[token]');
        }
    }
    else throw new Error('인증 헤더가 필요합니다')
}