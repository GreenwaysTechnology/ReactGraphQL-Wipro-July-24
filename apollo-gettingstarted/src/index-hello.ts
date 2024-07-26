import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//Define schema
const typeDefs = `
   type Query {
   """
     Multi line comment => Multi line
    """
     hello:String
     hai:String
   }
`
//Biz logic:Resolvers

const resolvers = {
    //Query
    Query: {
        //implementation of hello
        hello(): string {
            return "Hello,GraphqQl"
        }
    }
    //Mutation

    //Subscription

}
//3.We need to deploy the schema and bind with resolver 
// const server = new ApolloServer({
//     typeDefs: typeDefs,
//     resolvers: resolvers
// })
const server = new ApolloServer({
    typeDefs,
    resolvers
})

//4.Start web server (Express.js)
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready ${url}`)