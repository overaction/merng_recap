const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

// 컬렉션 이름을 User라고 지정해도 소문자 변경 후 s가 붙어서 users가 된다
// 3번째 인자로 강제 개명 없이 컬렉션 이름을 줄 수 있다
module.exports = model('User', userSchema, /*'freename'*/);