const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt:-1});
                console.log(posts);
                return posts;
            }
            catch(err) {
                throw new Error(err);
            }
        },
        async getPost(_,{postId}) {
            try {
                const post = await Post.findOne({_id: postId});
                if(post) {
                    console.log(post);
                    return post;
                }
                else {
                    throw new Error('포스트를 찾을 수 없습니다')
                }
            }
            catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_,{body},context) {
            const user = checkAuth(context);
            console.log(user);

            const newPost = new Post({
                body,
                username:user.username,
                user: user.id,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save();

            return post;
        },
        async deletePost(_,{postId},context) {
            const user = checkAuth(context);
            
            try {
                const post = await Post.findById(postId);
                if(post.username === user.username) {
                    await post.delete();
                    return "포스트가 삭제되었습니다"
                }
                else {
                    return "다른 사람의 포스트를 삭제할 수 없습니다"
                }
            }
            catch(err) {
                throw new Error(err);
            }
        }
    }
}