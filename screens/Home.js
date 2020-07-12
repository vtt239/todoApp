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
  RefreshControl
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
//import CalendarPicker from 'react-native-calendar-picker';

let id = 0;

export default function HomeScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [datas, setData] = useState([]);
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    fetch("http://192.168.1.233:3000/list_all_foods") //192.168.100.19
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [isLoading]);

  const postdata = () => {
    fetch("http://192.168.1.233:3000/insert_new_foods", {
      //192.168.100.19
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: route.params?.post,
        key: route.params?.post1,
        imageUrl: route.params?.date,
      }),
    });
    setLoading(route.params?.refesh);
    console.log(isLoading);
  };

  const DeleteData = (id) => {
    fetch("http://192.168.1.233:3000/delete_a_food", {
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
    setLoading(true)
  }, []);

  // console.log(datas);
  // console.log(isLoading);

  const formatDate = (date) => {
    return `${date.getHours()}h:${date.getMinutes()} Ngày ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  const addTodo = () => {
    id++;

    setTodos([
      ...todos,
      {
        key: id,
        td: route.params?.post,
        gt: route.params?.post1,
        date: route.params?.date,
      },
    ]);
  };

  const deleteTodo = (key) => {
    setTodos(todos.filter((todo) => todo.key !== key));
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            backgroundColor: "skyblue",
            borderRadius: 15,
            //marginHorizontal: 150,
            marginTop: 20,
            marginLeft: 40,
            width: 100,
          }}
        >
          <Button
            title="Create"
            onPress={() => {
              navigation.navigate("DetailsScreen");
              //setLoading(true);
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "skyblue",
            borderRadius: 15,
            //marginHorizontal: 150,
            marginTop: 20,
            marginRight: 40,
            width: 100,
          }}
        >
          <Button title="Add" onPress={postdata} />
        </View>
      </View>
      <Text style={{ fontSize: 50, paddingBottom: 5, fontWeight: "bold" }}>
        Danh Sách:
      </Text>
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
            {
            //getData(),
            datas.map((data) => (
              <TouchableOpacity
                key={data._id}
                onPress={() => {
                  setLoading(true)
                  navigation.navigate("Edit", {
                    postID: data._id,
                    postTd: data.name,
                    postGc: data.key,
                    postDate: data.imageUrl,
                  });
                }}
              >
                <View style={styles.cntext}>
                  <View style={styles.tt}>
                    <Text style={styles.td}>Tiêu Đề: {data.name}</Text>
                    <Text style={styles.gc}>Ghi chú: {data.key}</Text>
                    <Text style={styles.gc}>Lúc: {data.imageUrl}</Text>
                  </View>
                  <View style={{ marginTop: 15, marginLeft: 5 }}>
                    <Button
                      title="Delete"
                      color="red"
                      onPress={() => DeleteData(data._id)}
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
    width: 280,
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

{
  // React.useEffect(() => {
  //   if (route.params?.post && route.params?.post1 && route.params?.date) {
  //     // Post updated, do something with `route.params.post`
  //     // For example, send the post to the server
  //     // setTieude(route.params?.post);
  //     // setGhichu(route.params?.post1);
  //     // setDate(route.params?.date);
  //     // console.log(todos)
  //   }
  // }, [route.params?.post, route.params?.post1, route.params?.hour]);
  /* <FlatList
          data= {todos}
          renderItem={
            ({item})=>(
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    borderRadius: 5,
                    marginBottom: 10,
                    marginHorizontal: 10,
                    //backgroundColor: "#d3d3d3",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      paddingHorizontal: 8,
                      marginBottom: 3,
                    }}
                  >
                    Tiêu Đề: {item.td}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      paddingHorizontal: 10,
                      marginBottom: 5,
                    }}
                  >
                    Ghi chú: {item.gt}, Lúc: {item.date}
                  </Text>
                </View>
                <View style={{ marginTop: 5, marginLeft: 5 }}>
                  <Button title="Delete" color="red" />
                </View>
              </View>
            )
          }
        /> */
}
