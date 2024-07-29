import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Counter = () => {
    const [counter, setCounter] = useState(0)
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Counter {counter}</Text>
        <Button title="+" onPress={() => {
            setCounter(counter + 1)
        }} />
    </View>
}

function App() {
    return <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Welcome To Graphql app!</Text>
        <Counter />
    </View>
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    }
})
