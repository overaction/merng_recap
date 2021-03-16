const commentsResolvers = require('./comments');
const postsResolvers = require('./posts');
const usersResolvers = require('./users');
module.exports = {
    Post: {
        // parent : Post
        likeCount: (parent) => {
            return parent.likes.length;
        },
        commentCount: (parent) => {
            return parent.comments.length;
        }
    },
    Query: {
        ...postsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}