const express=require('express')
const graphqlHTTP=require('express-graphql')
const schema=require('./schema/schema')
const app=express()

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema
}))


const PORT=process.env.PORT||5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));