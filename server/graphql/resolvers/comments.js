const { UserInputError } = require('apollo-server-errors');
const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');

module.exports = {
    Mutation: {
        createComment: async (_,{postId,body},context) => {
            const user = checkAuth(context);
            if(body.trim() === '') {
                throw new UserInputError('내용을 입력해주세요', {
                    error: {
                        body: "내용은 빈 칸이 될 수 없습니다"
                    }
                })
            }
            try {
                const post = await Post.findByIdAndUpdate(postId, {
                    $push: {"comments": {
                        body,
                        username: user.username,
                        createdAt: new Date().toISOString()
                    }}
                }, {
                    new: true
                })
                return post;
            }
            catch(err) {
                throw new UserInputError('포스트를 찾을 수 없습니다')
            }
        } 
    }
}