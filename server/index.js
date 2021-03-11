const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGOURI } = require('./config/keys');

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            }
            catch(err) {
                throw new Error(err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers
});

// G3NKijqVd42lfgDe

mongoose.connect(MONGOURI,{useNewUrlParser: true})
.then(() => {
    console.log('MongoDB 연결')
    return server.listen({ port: 5000 })
})
.then(res => {
    console.log(`서버 실행 중 ${res.url}`);
})