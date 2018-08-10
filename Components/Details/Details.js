import React from 'react';
import {
    Text,
    View,
    FlatList,
    Button
} from "react-native";

export class DetailsScreen extends React.Component {
    state = {
        Item: [],
        Index: null
    }

    componentDidMount() {
        const ToDoItem = this.props.navigation.getParam('ToDoItem');
        const IndexParam = this.props.navigation.getParam('Index');
        this.setState({ Item: ToDoItem });
        this.setState({ Index: IndexParam });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('ToDoItem', 'Details Screen'),
            headerRight: (

                <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#fff"
                />
            ),

            headerLeft: (
                <Button
                    onPress={() => navigation.navigate('MyModal')}
                    title="Modal"
                    color="#fff"
                />
            ),
        };
    };

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button title="Go Back" onPress={() => this.props.navigation.goBack()} />
                <Text>To Do Item: {JSON.stringify(this.state.Item)}</Text>
                <Text>Index: {JSON.stringify(this.state.Index)}</Text>

                <Text style={{ padding: 20 }}>Display Response JSON Data</Text>
                <FlatList
                    data={this.state.Item}
                    renderItem={({ item }) => <Text>{item.id} {item.title}</Text>} />
            </View>
        );
    }
}

