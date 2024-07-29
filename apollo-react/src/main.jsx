import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client'

const uri = 'http://localhost:4000/'
const client = new ApolloClient({
    uri: uri,
    cache: new InMemoryCache()
})


const TODO_MUTATION = gql`
  mutation CREATE_TODO($title:String!,$completed:Boolean=false) {
    addTodo(title:$title,completed:$completed){
       id
       title
       completed
    }
}

 `

function Todo() {
    let title;
    let completed;
    const [addTodo, { data, loading, error }] = useMutation(TODO_MUTATION)
    if (loading) return 'Submitting'
    if (error) return `Submssion eror! ${error.message}`
    if(data){
        return <h1>{JSON.stringify(data)}</h1>
    }
    return <div>
        <form onSubmit={e => {
            e.preventDefault()
            addTodo({ variables: { title: title.value, completed: false } })
        }}>
            <input ref={node => {
                title = node
            }} />
            <button type="submit">Add Todo</button>
        </form>
    </div>
}
const App = () => {
    return <>
        <Todo />
    </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
)
