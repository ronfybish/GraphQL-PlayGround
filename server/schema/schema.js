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
//Mutation
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		CreateUser: {
			type: UserType,
			args: {
				// id: { type: GraphQLID },
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
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
		CreatePost: {
			type: PostType,
			args: {
				// id: { type: GraphQLID },
				comment: { type: GraphQLString },
				userId: { type: GraphQLID },
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
		CreateHobby: {
			type: HobbyType,
			args: {
				// id: { type: GraphQLID },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				userId: { type: GraphQLID },
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
	},
});
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
