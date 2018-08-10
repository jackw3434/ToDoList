import React from 'react';
import {
    Image,
    Text,
    View,
    Button} from "react-native";

export class HomePage extends React.Component {
    state={
        userName: "Jack",
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Text>
                   Welcome To Your To Do List {this.state.userName}.
                </Text>
            </View>
            
                <Image source={require('/Users/Jack/Desktop/Dev-Jack/ToDo App/ToDoList/Components/Home/download.png')} />
                <Text>Home Page</Text>
                <Button title="Go" onPress={() => {
                    this.props.navigation.navigate('List')
                }} />
            </View>
        );
    }
}

