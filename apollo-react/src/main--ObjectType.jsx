import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client'

const uri = 'http://localhost:4000/'
const client = new ApolloClient({
    uri: uri,
    cache: new InMemoryCache()
})


const USER_QUERY = gql`
query USER_QUERY {
  user {
    id
    firstName
    lastName
    age
    status
    points
  }
}
  `

function User() {
    const { loading, error, data } = useQuery(USER_QUERY)


    if (loading) return <p>Loading....</p>
    if (error) return <p>Error:{error.message}</p>
    console.log(data)
    return <>
        <h1>{data.user.id} {data.user.firstName} {data.user.lastName}</h1>
    </>
}
const App = () => {
    return <>
        <User/>
    </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
)
