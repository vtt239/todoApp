import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Button,
  Text,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
//import React, { Component } from "react";

import HomeScreen from "./screens/Home";
import TabBarIcon from "./components/TabBarIcon";
import DetailsScreen from "./screens/DetailsScreen";
import Edit from "./screens/Edit";
import Login from "./screens/Login";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import Tabhome from "./navigation/Tabhome";
import { render } from "react-dom";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

//#region TODOapp
// let id = 0

// const Todo = props => (
//   <View style = {{flexDirection: 'row', alignItems:'center'}}>
//     <Text>{props.todo.text}</Text>
//     <Switch value = {props.todo.checked} onValueChange={props.onToggle} />
//     <Button
//       onPress = {props.onDelete}
//       title="delete"
//     />
//     <Button
//       title= "Edit"
//     />
//   </View>
// )

// export default class App extends React.Component{
//   constructor(){
//     super()
//     this.state = {
//       todos: [],
//       text: "",
//     }
//   }

//   addTodo(){
//     id++
//     const text = this.state.text
//     this.setState({
//       todos: [
//         ...this.state.todos,
//         {id: id, text: text, checked: false},
//       ],
//     })
//   }

//   removeTodo(id){
//     this.setState({
//       todos: this.state.todos.filter(todo => todo.id !== id)
//     })
//   }

//   toggleTodo(id){
//     this.setState({
//       todos: this.state.todos.map(
//         todo =>{
//           if(todo.id !== id) return todo
//           return {
//             id: todo.id,
//             text: todo.text,
//             checked: !todo.checked,
//           }
//         }
//       )
//     })
//   }

//   render(){
//     return(
//       <View style = {{paddingTop: 20, flex:1}}>
//         <Text style={styles.text}> Danh Sách lời nhắc: {this.state.todos.length}</Text>
//         <Text style={{paddingBottom:20}}> Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length}</Text>

//         <View style={styles.boxInput}>
//           <TextInput style={styles.InputText}
//             onChangeText={(value) => this.setState(text)}
//             value= {text}
//           />
//         </View>

//         <View style={styles.bt}>
//           <Button onPress={()=>this.addTodo()} title="Add Todo"/>
//         </View>

//         <ScrollView>
//           {
//             this.state.todos.map(todo =>(
//               <Todo
//                 onToggle={()=>this.toggleTodo(todo.id)}
//                 onDelete={()=>this.removeTodo(todo.id)}
//                 todo={todo}
//               />
//             ))
//           }
//         </ScrollView>
//       </View>
//     )
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   text: {
//     fontSize: 30,
//   },
//   bt: {
//     fontSize: 40,
//     backgroundColor: 'skyblue',
//     borderRadius: 5,
//   },
//   InputText: {
//     borderRadius: 3,
//     fontSize: 24,
//     color: "#000000",
//   },
//   boxInput: {
//     borderWidth:2,
//     padding: 5,
//     borderRadius: 3,
//     alignContent: "center",
//     borderColor: "black",
//     //marginHorizontal: 50, //cach deu 2 ben
//     elevation: 1,
//   },
// })
//#endregion

//#region Navigation

function HomeScreenTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
}

export default function App(props) {
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer>
        <BottomTab.Navigator>
          <BottomTab.Screen
            name="Home"
            component={HomeScreenTab}
            options={{
              title: "Ghi chú",
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} name="ios-calendar" />
              ),
            }}
          />
          <BottomTab.Screen
            name="Tab"
            component={Login}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarIcon
                  focused={focused}
                  name="md-checkmark-circle-outline"
                />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
});
//#endregion

