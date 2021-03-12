const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../../config/keys')

module.exports = {
    Mutation: {
        async register(_,{registerInput: {username, email, password, confirmPassword}},context,info) {
            // TODO: validate user data
            // TODO: 유저가 존재하지 않는지 검증
            // 비밀번호 해시, auth token 생성
            password = await bcrypt.hash(password,12);

            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save()
            console.log(`res : ${res}`);

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            },SECRET_KEY,{expiresIn: '5h'});

            return {
                ...res.toObject(),
                id: res._id,
                token
            }
        }
    }
}