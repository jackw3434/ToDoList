import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform,
  Alert
} from "react-native";
import { createStackNavigator } from 'react-navigation';

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

class TodoList extends React.Component {
  state = {
    tasks: [],
    text: ""    
  };
  
  changeTextHandler = text => {
    this.setState({ text: text });
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        (prevState) => {
          let { tasks, text } = prevState;

          var item = { key: tasks.length, text: text };

          return {
            tasks: tasks.concat(item),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  }; 



  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  navigateTo(target) {   

    this.props.navigation.navigate(target);
  }

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
        <Text>{this.state.text}</Text>
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <Button title="Nav" onPress={() => {
                 this.props.navigation.navigate('Details',
                 {ToDoItem: item.text, Index: index})
                }}/>

                <Button title="Show Alert" onPress={() => Alert.alert('Alert Title', item.text,
                [{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                {text: 'OK', onPress: () => console.log('Ok Pressed')},
              ],
              {cancelable: true}
              )} />
                <Button title="X" onPress={() => this.deleteTask(index)} />
              </View>
              <View style={styles.hr} />
            </View>}
        />        
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
    
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});

class DetailsScreen extends React.Component {
  state = {
    Item : null,
    Index: null
  }
  
  componentDidMount() {
   const ToDoItem = this.props.navigation.getParam('ToDoItem');
   const IndexParam = this.props.navigation.getParam('Index');
   this.setState({Item: ToDoItem});
   this.setState({Index: IndexParam});
  }

  render() {  
   
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title="Go Back" onPress={() => this.props.navigation.goBack()}/>
        <Text>To Do Item: {JSON.stringify(this.state.Item)}</Text>
        <Text>Index: {JSON.stringify(this.state.Index)}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("Details", () => DetailsScreen);

console.log('hello');

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
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}