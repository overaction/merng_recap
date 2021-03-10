const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/keys');

const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => {
            return 'hello world'
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