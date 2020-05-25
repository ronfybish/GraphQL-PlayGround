const graphql = require('graphql');
var _ = require('loadsh');
const {
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLInt,
	GraphQLObjectType,
} = graphql;

let usersData = [
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
		title: 'coding',
		description: 'Using computers to make 1',
		userId: '1',
	},
	{
		id: '2',
		title: 'sing',
		description: 'Using computers to make 2',
		userId: '1',
	},
	{
		id: '3',
		title: 'basketball',
		description: 'Using computers to make 3',
		userId: '2',
	},
	{
		id: '4',
		title: 'football',
		description: 'Using computers to make 4',
		userId: '2',
	},
	{
		id: '5',
		title: 'racing',
		description: 'Using computers to make 5',
		userId: '3',
	},
	{
		id: '6',
		title: 'wrating',
		description: 'Using computers to make 6',
		userId: '3',
	},
];

const UserType=new GraphQLObjectType({
    name:'User',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        proffesion:{type:GraphQLString}
    })
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(usersData,{id:args.id})
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})