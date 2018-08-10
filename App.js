import React from 'react';

import {
	AppRegistry
} from "react-native";
import { TodoList } from "./Components/ToDoList/TodoList";
import { DetailsScreen } from "./Components/Details/Details";
import { createStackNavigator } from 'react-navigation';
import { HomePage } from "./Components/Home/HomePage";

AppRegistry.registerComponent("HomePage", () => HomePage);
AppRegistry.registerComponent("TodoList", () => TodoList);
AppRegistry.registerComponent("Details", () => DetailsScreen);




const RootStack = createStackNavigator(
	{
		Home: {
			screen: HomePage,
		},
		List: {
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