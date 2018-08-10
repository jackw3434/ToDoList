import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    TextInput,
    Keyboard,
    Platform,
    Alert
} from "react-native";
import { ToDoItemClass } from "./ToDoItemClass";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export class TodoList extends React.Component {
    state = {        
        tasks: [],
        text: "",
    };

    static navigationOptions = {
        title: 'To Do List',
    };

    changeTextHandler = text => {
        this.setState({ text: text });
    };

    addTask = () => {
        let notEmpty = this.state.text.trim().length > 0;

        if (notEmpty) {
            this.setState(
                (prevState) => {
                    let { uid, id, tasks, text, completed } = prevState;

                  //  var item = { key: tasks.length, text: text };
                    var item = new ToDoItemClass(uid, id, tasks, text, completed);
                    item.userId = "";
                    item.id = tasks.length;
                    item.title = text;
                    item.completed = false;

                    var newArray = tasks;
                    newArray.unshift(item);

                    return {
                        tasks: tasks.concat(newArray),
                        text: ""
                    };
                }
            );
        }
    };

    deleteTask = i => {
        this.setState(
            prevState => {
                let tasks = prevState.tasks.slice();

                tasks.splice(i, 1);

                return { tasks: tasks };
            }
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

        //AJAX 
        return fetch('https://jsonplaceholder.typicode.com/todos/')
            .then((response) => {
                return response.json();
            }).then((responseJson) => {

                this.setState({
                    tasks: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
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
                                    {item.title}
                                </Text>
                                <Button title="Go" onPress={() => {
                                    this.props.navigation.navigate('Details',
                                        { ToDoItem: item.title, Index: index })
                                }} />
                                <Button title="Show Alert" onPress={() => Alert.alert('Alert Title', item.title,
                                    [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                                    { text: 'OK', onPress: () => console.log('Ok Pressed') },
                                    ],
                                    { cancelable: true }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: viewPadding,
        paddingTop: 20
    },
    list: {
        width: "100%",
    },
    listItem: {
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 18,
        textAlign: "right",
        flex: 1,
        flexWrap: 'wrap'
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