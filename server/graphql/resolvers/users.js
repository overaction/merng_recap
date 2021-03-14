const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');
const {SECRET_KEY} = require('../../config/keys');
const {validateRegisterInput, validateLoginInput} = require('../../util/validators');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    },SECRET_KEY,{expiresIn: '5h'});
}

module.exports = {
    Mutation: {
        async login(_,{email, password}) {
            const {errors, valid} = validateLoginInput(email, password);
            if(valid > 1) throw new UserInputError('Error',{errors})
            const user = await User.findOne({email});
            if(!user) {
                throw new UserInputError('유저 정보가 없습니다', {
                    errors: {
                        ...errors,
                        general: '유저 정보가 없습니다'
                    }
                });
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                throw new UserInputError('비밀번호가 올바르지 않습니다', {
                    errors: {
                        ...errors,
                        password: '비밀번호가 올바르지 않습니다'
                    }
                })
            }
            const token = generateToken(user);
            return {
                ...user.toObject(),
                id: user._id,
                token
            }
        },
        async register(_,{registerInput: {username, email, password, confirmPassword}},context,info) {
            // TODO: validate user data
            const {errors, valid} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError('Error',{errors});
            }
            // TODO: 유저가 존재하지 않는지 검증
            await User.findOne({email})
            .then(res => {
                if(res)
                    throw new UserInputError('이미 존재하는 이메일입니다', {
                        errors: {
                            email: '이미 존재하는 이메일입니다.'
                        }
                    })
            })
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

            const token = generateToken(res);

            return {
                ...res.toObject(),
                id: res._id,
                token
            }
        }
    }
}