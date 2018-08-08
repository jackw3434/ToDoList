import React from "react";
import {
	AppRegistry
} from "react-native";
import { TodoList } from "./TodoList";
import { DetailsScreen } from "./Details";
import { createStackNavigator } from 'react-navigation';

AppRegistry.registerComponent("Details", () => DetailsScreen);
AppRegistry.registerComponent("TodoList", () => TodoList);

const RootStack = createStackNavigator(
	{
		Home: {
			screen: TodoList,
		},
		Details: {
			screen: DetailsScreen,
		},
	},
	{
		initialRouteName: 'Home',
		navigationOptions: {
			headerStyle: {
                backgroundColor: '#008080',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
		},
	}
);

export default class App extends React.Component {
	render() {
		return <RootStack />;
	}
}