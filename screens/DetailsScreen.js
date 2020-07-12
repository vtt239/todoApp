import "react-native-gesture-handler";
import React, { Component, useState } from "react";
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

let id = 0;

export default function DetailsScreen({ navigation }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);
  const [tieude, settieude] = React.useState("");
  const [ghichu, setghichu] = React.useState("");

  // const postdata = () => {
  //   fetch("http://192.168.1.233:3000/insert_new_foods", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: route.params?.post,
  //       key: route.params?.post1,
  //       imageUrl: route.params?.date,
  //     }),
  //   });
  //   setLoading(route.params?.refesh);
  //   console.log(isLoading);
  // };

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

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 5 }}>
        Chi Tiết Lời Nhắc:{" "}
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
        <View
          style={{
            backgroundColor: "skyblue",
            borderRadius: 10,
            marginHorizontal: 100,
            marginTop: 20,
          }}
        >
          <Button
            title="Add"
            onPress={() => {
              navigation.navigate("HomeScreen", {
                post: tieude,
                post1: ghichu,
                date: formatDate(date),
                refesh: true,
              });
            }}
            // onPress={() => {
            //   navigation.navigate("HomeScreen");
            //   postdata
            // }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
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
