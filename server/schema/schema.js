const graphql = require('graphql');
const RootQuery = require('../schema/rootQuery');
const Mutation = require('../schema/mutation');
const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
