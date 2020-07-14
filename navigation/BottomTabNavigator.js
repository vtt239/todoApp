import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import HomeScreen from "../screens/Home";
import DetailsScreen from "../screens/DetailsScreen";
import Edit from "../screens/Edit";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator>
          <BottomTab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Home",
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} name="ios-home" />
              ),
            }}
          />
          <BottomTab.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{
              title: "DetailsScreen",
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} name="ios-calendar" />
              ),
            }}
          />
          <BottomTab.Screen
            name="Edit"
            component={Edit}
            options={{
              title: "Edit",
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} name="md-checkmark-circle-outline" />
              ),
            }}
          />
        </BottomTab.Navigator>
    // <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
    //   <BottomTab.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{
    //       title: 'Get Started',
    //       tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
    //     }}
    //   />
    //   <BottomTab.Screen
    //     name="Links"
    //     component={LinksScreen}
    //     options={{
    //       title: 'Resources',
    //       tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-settings" />,
    //     }}
    //   />
    // </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
