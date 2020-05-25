const graphql = require('graphql');
const User = require('../model/User');
const Hobby = require('../model/Hobby');
const Post = require('../model/Post');
var _ = require('loadsh');
const { PostType, HobbyType, UserType } = require('../schema/types');
const RootQuery = require('../schema/rootQuery');
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
} = graphql;

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		CreateUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				proffesion: { type: GraphQLString },
			},
			async resolve(parent, args) {
				const { name, age, proffesion } = args;
				try {
					let user = new User({
						name,
						age,
						proffesion,
					});
					await user.save();
					return user;
				} catch (error) {}
			},
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
				proffesion: { type: GraphQLString },
			},
			async resolve(parent, args) {
				try {
					const userUpdated = await User.findByIdAndUpdate(
						args.id,
						{ ...args },
						{ new: true }
					);
					return userUpdated;
				} catch (error) {
					console.log(error);
				}
			},
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			async resolve(parent, args) {
				try {
					const userDeleted = await User.findByIdAndRemove(args.id);
					if (!userDeleted) throw error;
					return userDeleted;
				} catch (error) {
					console.error(error);
				}
			},
		},
		CreatePost: {
			type: PostType,
			args: {
				comment: { type: new GraphQLNonNull(GraphQLString) },
				userId: { type: new GraphQLNonNull(GraphQLID) },
			},
			async resolve(parent, args) {
				const { comment, userId } = args;
				let post = new Post({
					comment,
					userId,
				});
				await post.save();
				return post;
			},
		},
		updatePost: {
			type: PostType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				userId: { type: new GraphQLNonNull(GraphQLID) },
				comment: { type: GraphQLString },
			},
			async resolve(parent, args) {
				try {
					const postUpdated = await Post.findByIdAndUpdate(
						args.id,
						{ ...args },
						{ new: true }
					);
					return postUpdated;
				} catch (error) {
					console.log(error);
				}
			},
		},
		deletePost: {
			type: PostType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			async resolve(parent, args) {
				try {
					const postDeleted = await Post.findByIdAndRemove(args.id);
					if (!postDeleted) throw error;
					return postDeleted;
				} catch (error) {
					console.error(error);
				}
			},
		},
		CreateHobby: {
			type: HobbyType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLString },
				userId: { type: new GraphQLNonNull(GraphQLID) },
			},
			async resolve(parent, args) {
				const { title, description, userId } = args;
				let hobby = new Hobby({
					title,
					description,
					userId,
				});
				await hobby.save();
				return hobby;
			},
		},
		updateHobby: {
			type: HobbyType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				userId: { type: new GraphQLNonNull(GraphQLID) },
				title: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(parent, args) {
				try {
					const hobbyUpdated = await Hobby.findByIdAndUpdate(
						args.id,
						{ ...args },
						{ new: true }
					);
					return hobbyUpdated;
				} catch (error) {
					console.log(error);
				}
			},
		},
		deleteHobby: {
			type: HobbyType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			async resolve(parent, args) {
				try {
					const hobbyDeleted = await Hobby.findByIdAndRemove(args.id);
					if (!hobbyDeleted) throw error;
					return hobbyDeleted;
				} catch (error) {
					console.error(error);
				}
			},
		},
	},
});

module.exports = Mutation;
