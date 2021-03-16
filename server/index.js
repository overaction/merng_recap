const { ApolloServer,PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGOURI } = require('./config/keys');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers,
    context: ({req}) => {
        return {req,pubsub}
    }
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