const graphql = require('graphql');
const User = require('../model/User');
const Hobby = require('../model/Hobby');
const Post = require('../model/Post');
var _ = require('loadsh');

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
} = graphql;

//Create types
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		proffesion: { type: GraphQLString },
		posts: {
			type: new GraphQLList(PostType),
			async resolve(parent, args) {
				try {
					const userPosts = await Post.find({ userId: parent.id });
					return userPosts;
				} catch (error) {
					console.error(error);
				}
			},
		},
		hobbies: {
			type: new GraphQLList(HobbyType),
			async resolve(parent, args) {
				try {
					const userHobbies = await Hobby.find({ userId: parent.id });
					return userHobbies;
				} catch (error) {
					console.error(error);
				}
			},
		},
	}),
});

const HobbyType = new GraphQLObjectType({
	name: 'Hobby',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		user: {
			type: UserType,
			async resolve(parent, args) {
				try {
					const user = await User.findById(parent.userId);
					return user;
				} catch (error) {
					console.error(error);
				}
			},
		},
	}),
});

const PostType = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		user: {
			type: UserType,
			async resolve(parent, args) {
				try {
					const user = await User.findById(parent.userId);
					return user;
				} catch (error) {
					console.error(error);
				}
			},
		},
	}),
});

module.exports = {
	PostType,
	HobbyType,
	UserType,
};
