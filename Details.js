import React from "react";
import {
    Text,
    View,
    Button
} from "react-native";

export class DetailsScreen extends React.Component {
    state = {
        Item: null,
        Index: null
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('ToDoItem', 'Details Screen'),
            headerStyle: {
                backgroundColor: '#008080',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    };

    componentDidMount() {
        const ToDoItem = this.props.navigation.getParam('ToDoItem');
        const IndexParam = this.props.navigation.getParam('Index');
        this.setState({ Item: ToDoItem });
        this.setState({ Index: IndexParam });
    }

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5FCFF' }}>
                <Text>Details Screen</Text>
                <Button title="Go Back" onPress={() => this.props.navigation.goBack()} />
                <Text>To Do Item: {JSON.stringify(this.state.Item)}</Text>
                <Text>Index: {JSON.stringify(this.state.Index)}</Text>
            </View>
        );
    }
}