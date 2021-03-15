const { UserInputError, AuthenticationError } = require('apollo-server-errors');
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
        },
        async deleteComment(_,{postId, commentId},context) {
            const user = checkAuth(context);
            
            try {
                const post = await Post.findById(postId);
                const commentIdx = post.comments.findIndex(c => c.id === commentId);
                if(post.comments[commentIdx].username === user.username) {
                    post.comments.splice(commentIdx,1);
                    await post.save();
                    
                    return post;
                }
                else {
                    throw new AuthenticationError('허용되지 않은 접근입니다')
                }
            }
            catch(err) {
                throw new UserInputError('포스트 또는 댓글이 존재하지 않습니다');
            }
        }
    }
}