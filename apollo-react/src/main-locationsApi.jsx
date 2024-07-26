import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client'

//we will initalize the Apollo client ,passing its constructor a configuration object with uri
//and cache fields

const uri = 'https://flyby-router-demo.herokuapp.com/'
const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache()
})
//declare the query
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
       id 
       name 
       description
       photo
    }
 } 
  `
function Location() {
  const { loading, error, data } = useQuery(GET_LOCATIONS)

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error:{error.message}</p>
  return data.locations.map(({ id, name, description, photo }) => {
    return <div key={id}>
      <h3>{name}</h3>
      <img width="400" height={250} alt="location-reference" src={`${photo}`} />
      <br/>
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>

  })
}


const App = () => {
  return <>
    <Location />
  </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
