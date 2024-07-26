import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client'

const uri = 'http://localhost:4000/'
const client = new ApolloClient({
    uri: uri,
    cache: new InMemoryCache()
})

//declare the query
const GET_HELLO = gql`
query HELLOQuery {
  hello
}
 `
const MATH_QUERY = gql`
query AddQuery {
  add
  multiply
  div
}
  `

function Add() {
    const { loading, error, data } = useQuery(MATH_QUERY)

    if (loading) return <p>Loading....</p>
    if (error) return <p>Error:{error.message}</p>
    console.log(data)
    return <>
        <h1>{data.add} {data.multiply} {data.div}</h1>
    </>
}
const App = () => {
    return <>
        <Add/>
    </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
)
