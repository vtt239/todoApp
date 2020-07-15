import "react-native-gesture-handler";
import React, { Component, useState, useEffect, useMemo } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Switch,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
//import CalendarPicker from 'react-native-calendar-picker';

import { RadioButton } from "react-native-paper";

let id = 0;

export default function HomeScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(false);
  const [datas, setData] = useState([]);
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [checked, setChecked] = useState(false);

  const TodoItem = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          //setLoading(true);
          navigation.navigate("Edit", {
            postID: props._id,
            postTd: props.name,
            postGc: props.key,
            postDate: props.imageUrl,
          });
        }}
      >
        <View style={styles.cntext}>
          {/* <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={props.checked ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={props.checked}
            style={{ marginTop: 15 }}
          /> */}
          <View style={styles.tt}>
            <Text style={styles.td}>Tiêu Đề: {props.name}</Text>
            <Text style={styles.gc}>Ghi chú: {props.key}</Text>
            <Text style={styles.gc}>Lúc: {props.imageUrl}</Text>
          </View>
          <View style={{ marginTop: 15, marginLeft: 5 }}>
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteData(props._id)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //if(isLoading!=false){}
  //setLoading(route.params?.refesh);

  useEffect(() => {
    fetch("http://192.168.100.19:3000/list_all_foods") //192.168.100.19
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [isLoading]);

  const deleteData = (id) => {
    fetch("http://192.168.100.19:3000/delete_a_food", {
      //192.168.100.19
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        food_id: id,
      }),
    });
    setLoading(true);
  };

  const onRefresh = React.useCallback(() => {
    setLoading(true);
  }, []);

  const formatDate = (date) => {
    return `${date.getHours()}h:${date.getMinutes()} Ngày ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  const toggleSwitch = (id, ghichu, tieude, date, checked) => {
    fetch("http://192.168.100.19:3000/update_a_food", {
      //192.168.100.19
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        food_id: id,
        checked: !checked,
        key: ghichu,
        name: tieude,
        imageUrl: date,
      }),
    });
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.btCreate}>
          <Button
            title="Create"
            onPress={() => {
              navigation.navigate("DetailsScreen");
            }}
          />
        </View>
      </View>
      <Text style={styles.ds}>Danh Sách:</Text>
      <View style={styles.vt}></View>
      <View style={styles.vitem}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {datas.map((data) => (
              <TouchableOpacity
                key={data._id}
                onPress={() => {
                  navigation.navigate("Edit", {
                    postID: data._id,
                    postTd: data.name,
                    postGc: data.key,
                    postDate: data.imageUrl,
                  });
                }}
              >
                <View style={styles.cntext}>
                  <Switch
                    trackColor={{ false: "#87ceeb", true: "#87ceeb" }}
                    thumbColor={data.checked ? "#f8f8ff" : "#f8f8ff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      toggleSwitch(
                        data._id,
                        data.key,
                        data.name,
                        data.imageUrl,
                        data.checked,
                      );
                      setLoading(true);
                    }}
                    value={data.checked}
                    style={{ marginTop: 15 }}
                  />
                  <View style={styles.tt}>
                    <Text style={styles.td}>Tiêu Đề: {data.name}</Text>
                    <Text style={styles.gc}>Ghi chú: {data.key}</Text>
                    <Text style={styles.gc}>Lúc: {data.imageUrl}</Text>
                  </View>
                  <View style={{ marginTop: 15, marginLeft: 5 }}>
                    <Button
                      title="Delete"
                      color="red"
                      onPress={() => deleteData(data._id)}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btCreate: {
    backgroundColor: "skyblue",
    borderRadius: 15,
    marginHorizontal: 150,
    marginTop: 20,
    //marginLeft: 40,
    width: 100,
    marginBottom: 20,
  },
  bt: {
    backgroundColor: "skyblue",
    borderRadius: 15,
    marginTop: 20,
    marginRight: 40,
    width: 100,
  },
  ds: {
    fontSize: 50,
    paddingBottom: 5,
    fontWeight: "bold",
    marginLeft: 20,
  },
  boxInput: {
    padding: 5,
    borderRadius: 4,
    alignContent: "center",
    borderColor: "skyblue",
  },
  vitem: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 5,
    marginBottom: 5,
    marginHorizontal: 15,
  },
  cntext: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 380,
  },
  tt: {
    flexDirection: "column",
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    //backgroundColor: "#d3d3d3",
    width: 230,
  },
  td: {
    fontSize: 24,
    paddingHorizontal: 8,
    marginBottom: 3,
  },
  gc: {
    fontSize: 12,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  vt: {
    marginBottom: 5,
    height: 1,
    backgroundColor: "gray",
    marginHorizontal: 25,
  },
});

// const addTodo = () => {
//   id++;

//   setTodos([
//     ...todos,
//     {
//       key: id,
//       td: route.params?.post,
//       gt: route.params?.post1,
//       date: route.params?.date,
//     },
//   ]);
// };

// const deleteTodo = (key) => {
//   setTodos(todos.filter((todo) => todo.key !== key));
// };
