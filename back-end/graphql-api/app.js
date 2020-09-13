// "use strict";
// const graphql = require("graphql");
// const express = require("express");
// const graphqlHTTP = require("express-graphql").graphqlHTTP;
// const { GraphQLSchema } = graphql;
// const { query } = require("./schemas/queries");
// const { mutation } = require("./schemas/mutations");

// const schema = new GraphQLSchema({
// 	query,
// 	mutation
// });

// var app = express();
// app.use(
//   	'/',
//   	graphqlHTTP({
//     	schema: schema,
//     	graphiql: true
//   	})
// );

// app.listen(3000, () =>
//   	console.log('GraphQL server running on localhost:3000')
// );

const { ApolloServer } = require('apollo-server');
const { typeDefs } = require("./schemas/types");
const { resolvers } = require("./schemas/resolvers");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});