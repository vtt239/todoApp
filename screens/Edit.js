import "react-native-gesture-handler";
import React, { Component, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Edit({ navigation, route }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const [tieude, settieude] = useState(route.params?.postTd);
  const [ghichu, setghichu] = useState(route.params?.postGc);
  const [datee, setDatee] = useState(route.params?.postDate);
  const [id, setID] = useState(route.params?.postID);
  const [edit, setEdit] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const formatDate = (date) => {
    return `${date.getHours()}h:${date.getMinutes()} Ngày ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  useEffect(() => {
    if (edit === true) {
      navigation.navigate("HomeScreen", { refesh: true });
    }
  }, [edit]);

  const EditTodo = (id, tieude, ghichu, date) => {
    fetch("http://192.168.100.19:3000/update_a_food", {
      //192.168.100.19
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        food_id: id,
        key: ghichu,
        name: tieude,
        imageUrl: formatDate(date),
      }),
    });
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 5 }}>
        Chỉnh Sửa Lời Nhắc:{" "}
      </Text>
      <ScrollView>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Tiêu Đề"
            style={{ fontSize: 30, paddingBottom: 5 }}
            value={tieude}
            onChangeText={settieude}
          />
          <View style={{ height: 1, backgroundColor: "gray" }}></View>
          <TextInput
            placeholder="Ghi Chú"
            multiline={true}
            style={{ fontSize: 18, paddingTop: 5 }}
            value={ghichu}
            onChangeText={setghichu}
          />
        </View>

        <View>
          <Text style={styles.tg}>Nhắc tôi vào {formatDate(date)}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View>
            <Button onPress={showDatepicker} title="Chọn ngày nhắc" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Chọn giờ nhắc" />
          </View>
        </View>
        <View style={styles.btEdit}>
          <Button
            title="Edit"
            color="black"
            onPress={() => {
              EditTodo(id, tieude, ghichu, date);
              setEdit(true);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  btEdit: {
    backgroundColor: "green",
    borderRadius: 10,
    marginHorizontal: 100,
    marginTop: 20,
  },
  boxInput: {
    flexDirection: "column",
    padding: 20,
    borderRadius: 4,
    alignContent: "center",
    borderColor: "skyblue",
  },
  tg: {
    fontSize: 24,
    marginLeft: 20,
  },
});
