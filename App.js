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
