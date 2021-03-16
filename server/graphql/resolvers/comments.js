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
                        email: user.email,
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
                if(post.comments[commentIdx].email === user.email) {
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
        },
        async likePost(_,{postId},context) {
            const {username,email} = checkAuth(context);
            console.log(email,username);
            const post = await Post.findById(postId);
            if(post) {
                if(post.likes.find(like => like.email === email)) {
                    // 이미 좋아요를 눌렀음 -> unlike로 바꿔야함
                    post.likes = post.likes.filter(like => like.email !== email);
                }
                else {
                    // 좋아요 새로 누름
                    post.likes.push({
                        username,
                        email,
                        createdAt: new Date().toISOString()
                    });
                }
                await post.save();
                return post;
            }
            else {
                throw new UserInputError('포스트가 존재하지 않습니다')
            }
        }
    }
}