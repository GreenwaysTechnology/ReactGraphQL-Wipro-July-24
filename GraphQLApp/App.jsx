import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client'
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

const uri = 'https://countries.trevorblades.com/'
const client = new ApolloClient({
    uri: uri,
    cache: new InMemoryCache()
})


const COUNTRIES_QUERY = gql`
query COUNTRIES_QUERY {
  countries {
    name
  }
}

  `
const Countries = () => {
    const { loading, error, data } = useQuery(COUNTRIES_QUERY)
    if (loading) return <Text>Loading....</Text>
    if (error) return <Text>Error:{error.message}</Text>

    return <ScrollView style={styles.container}>
        <>
                {data.countries.map(country => {
                    return <Text style={{textAlign:'center',color:'blue'}}>{country.name}</Text>
                })}
        </>
    </ScrollView>
}

function App() {
    return <ApolloProvider client={client}>
        <Countries/>
    </ApolloProvider>
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink'
    }
})