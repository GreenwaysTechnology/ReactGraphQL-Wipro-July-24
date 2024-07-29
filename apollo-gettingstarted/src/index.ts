import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { LRUCache } from "lru-cache"
//type defs
const typeDefs = `
  type Query {
     todos:[Todo],
     todo(id:String!):Todo
  }
  type Todo{
   id:ID!
   title:String
   completed:Boolean
  }
  type Mutation {
   addTodo(title:String!,completed:Boolean):Todo
   updateTodo(id:String!,title:String!):Todo
  }

`
const todosItem = [{
    id: 1,
    title: "delectus aut autem",
    completed: false
},
{
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false
},]
//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        todos() {
            return todosItem
        }
    },
    //Mutation

    Mutation: {
        addTodo(_, { title, completed }) {
            const newTodo = { id: 2 + 2, title, completed }
            //write a logic to push newtodo into array
            todosItem.concat(newTodo)
            console.log(todosItem)
            return newTodo
        }
    }
    //Subscription
}
//3.We need to deploy the schema and bind with resolver 
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

//4.Start web server (Express.js)
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready ${url}`)

