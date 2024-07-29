import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client'

const uri = 'http://localhost:4000/'
const client = new ApolloClient({
    uri: uri,
    cache: new InMemoryCache()
})


const USERS_QUERY = gql`
query USERS_QUERY {
  users {
    id
    firstName
    lastName
    age
    status
    points
  }
}
  `

function Users() {
    const { loading, error, data } = useQuery(USERS_QUERY)

    if (loading) return <p>Loading....</p>
    if (error) return <p>Error:{error.message}</p>
    console.log(data)
    return <>
        <div>
            {data.users.map(user => {
                return <h1>{user.id} {user.firstName} {user.lastName}</h1>
            })}
        </div>
    </>
}
const App = () => {
    return <>
        <Users />
    </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
)
