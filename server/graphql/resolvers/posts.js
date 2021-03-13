const Post = require('../../models/Post');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
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
    }
}