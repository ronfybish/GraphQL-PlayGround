const graphql = require('graphql');
var _ = require('loadsh');
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema,
} = graphql;

//dummy data
let userData = [
	{ id: '1', name: 'Ron', age: 25, proffesion: 'developer' },
	{ id: '2', name: 'Liran', age: 52, proffesion: 'chef' },
	{ id: '3', name: 'Yosi', age: 17, proffesion: 'teacher' },
	{ id: '4', name: 'Almog', age: 34, proffesion: 'student' },
	{ id: '5', name: 'Dani', age: 65, proffesion: 'backer' },
];
let postsData = [
	{ id: '1', comment: 'comment 1', userId: '1' },
	{ id: '2', comment: 'comment 2', userId: '1' },
	{ id: '3', comment: 'comment 3', userId: '1' },
	{ id: '4', comment: 'comment 4', userId: '2' },
	{ id: '5', comment: 'comment 5', userId: '2' },
];

let hobbiesData = [
	{
		id: '1',
		title: 'Programming',
		description: 'Using computers to make 1',
		userId: '1',
	},
	{
		id: '2',
		title: 'Rowing',
		description: 'Using computers to make 2',
		userId: '1',
	},
	{
		id: '3',
		title: 'Swimming',
		description: 'Using computers to make 3',
		userId: '2',
	},
	{
		id: '4',
		title: 'Fencing',
		description: 'Using computers to make 4',
		userId: '2',
	},
	{
		id: '5',
		title: 'Hiking',
		description: 'Using computers to make5',
		userId: '3',
	},
];

//Create types
const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Documentation for user...',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		proffesion: { type: GraphQLString },
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return _.filter(postsData, { userId: parent.id });
			},
		},
		hobbies: {
			type: new GraphQLList(HobbyType),
			resolve(parent, args) {
				return _.filter(hobbiesData, { userId: parent.id });
			},
		},
	}),
});

const HobbyType = new GraphQLObjectType({
	name: 'Hobby',
	description: 'Hobby description',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return _.find(userData, { id: parent.userId });
			},
		},
	}),
});

const PostType = new GraphQLObjectType({
	name: 'Post',
	description: 'Post documentation',
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return _.find(userData, { id: parent.userId });
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
			resolve(parent, args) {
				return _.find(userData, {
					id: args.id,
				});
			},
		},
		hobby: {
			type: HobbyType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(hobbiesData, {
					id: args.id,
				});
			},
		},
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(postsData, {
					id: args.id,
				});
			},
		},
	},
});
//Mutation
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createUser: {
			type: UserType,
			args: {
				// id: { type: GraphQLID },
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
				proffesion: { type: GraphQLString },
			},
			resolve(parent, args) {
				let user = {
					name: args.name,
					age: args.age,
					proffesion: args.proffesione,
				};
				return user;
			},
		},
		createPost: {
			type: PostType,
			args: {
				// id: { type: GraphQLID },
                comment: { type: GraphQLString },
                userId:{type:GraphQLID}
            },
            resolve(parent,args){
                let post={
                    comment:args.comment,
                    userId:args.userId
                }
                return post
            }
        },
        createHobby:{
            type:HobbyType,
            args:{
                // id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId:{ type: GraphQLID }
            },
            resolve(parent,args){
                let hobby={
                    title:args.title,
                    description:args.description,
                    userId:args.userId,
                }
                return hobby
            }
        }
	},
});
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
