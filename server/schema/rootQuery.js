const graphql = require('graphql');
const User = require('../model/User');
const Hobby = require('../model/Hobby');
const Post = require('../model/Post');
var _ = require('loadsh');
const { PostType, HobbyType, UserType } = require('../schema/types');
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
} = graphql;

//RootQuery
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Description',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				try {
					const user = await User.findById(args.id);
					return user;
				} catch (error) {
					console.error(error);
				}
			},
		},
		users: {
			type: new GraphQLList(UserType),
			async resolve(parent, args) {
				try {
					const users = await User.find();
					return users;
				} catch (error) {
					console.error(error);
				}
			},
		},
		hobby: {
			type: HobbyType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				try {
					const hobby = await Hobby.findById(args.id);
					return hobby;
				} catch (error) {
					console.error(error);
				}
			},
		},
		hobbies: {
			type: new GraphQLList(HobbyType),
			async resolve(parent, args) {
				try {
					const hobbies = await Hobby.find();
					return hobbies;
				} catch (error) {
					console.error(error);
				}
			},
		},
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				try {
					const post = await Post.findById(args.id);
					return post;
				} catch (error) {
					console.error(error);
				}
			},
		},
		posts: {
			type: new GraphQLList(PostType),
			async resolve(parent, args) {
				try {
					const posts = await Post.find();
					return posts;
				} catch (error) {
					console.error(error);
				}
			},
		},
	},
});

module.exports = RootQuery;
