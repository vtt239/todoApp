import "react-native-gesture-handler";
import React, { Component, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function Login({ navigation }) {
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  //   return(
  //     <View style = {{paddingTop: 20, flex:1}}>
  //       <Text style={styles.text}> Danh Sách lời nhắc: {this.state.todos.length}</Text>
  //       <Text style={{paddingBottom:20}}> Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length}</Text>

  //       <View style={styles.boxInput}>
  //         <TextInput style={styles.InputText}
  //           onChangeText={(value) => this.setState(text)}
  //           value= {text}
  //         />
  //       </View>
        
  //       <View style={styles.bt}>
  //         <Button onPress={()=>this.addTodo()} title="Add Todo"/>
  //       </View>

  //       <ScrollView>
  //         {
  //           this.state.todos.map(todo =>(
  //             <Todo
  //               onToggle={()=>this.toggleTodo(todo.id)}
  //               onDelete={()=>this.removeTodo(todo.id)}
  //               todo={todo}
  //             />
  //           ))
  //         }
  //       </ScrollView>
  //     </View>
  //   )
  // }
//#region login
  const [user, SetUser] = useState("");
  const [password, SetPassword] = useState("");
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {/* <View style={styles.imgbkg}>
        <Image style={styles.img} source={require('../../img/ggt.jpg')} />
      </View> */}
        <TouchableOpacity
          onPress={() => {
            alert("Click");
          }}
        >
          <View style={styles.LogoView}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../img/login.png")}
            />
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>app0001</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.InputText}
            onChangeText={(user) => SetUser(user)}
            value = {user}
            placeholder="User"
            clearButtonMode="always"
          />
          <View style={{ backgroundColor: "#dcdcdc", height: 1.5 }}></View>
          <TextInput
            style={styles.InputText}
            onChangeText={(password) => SetPassword(password)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            clearButtonMode="always"
          />
        </View>
        {/* <View style={styles.btn}>
        <TouchableOpacity>
          <Image style={styles.logo} source={require('../../img/in.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.logo} source={require('../../img/out.png')} />
        </TouchableOpacity>
      </View> */}
        <View style={styles.btn}>
          <View style={{ backgroundColor: "skyblue",borderRadius: 5 }}>
            <Button
              title="Login"
              onPress={() => {
                // if (user === 'vtt' && password === '111') {
                navigation.navigate("Tabhome");
                //   SetUser('');
                //   SetPassword('');
                // } else {
                //   alert('not ok');
                // }
              }}
            />
          </View>
          <View style={{ backgroundColor: "red", borderRadius: 5 }}>
            <Button
              title="Exit"
              color="black"
              onPress={() => {
                SetUser("");
                SetPassword("");
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
  }
  //#endregion

const styles = StyleSheet.create({
  container: {
    flex: 100,
    flexDirection: "column",
    justifyContent: "center",
  },
  LogoView: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  imgbkg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  img: {
    flex: 1,
    flexDirection: "column",
    width: null,
    height: null,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  boxInput: {
    padding: 5,
    borderRadius: 3,
    alignContent: "center",
    borderColor: "skyblue",
    marginHorizontal: 50, //cach deu 2 ben
    shadowColor: "black",
  },
  InputText: {
    //marginHorizontal: 50,
    fontSize: 24,
    color: "#000000",
  },
  btn: {
    height: 90,
    paddingTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 50,
  },
  logo: {
    width: 70,
    height: 70,
  },
});
