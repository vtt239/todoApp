import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import HomeScreen from '../screens/Home';
import TabBarIcon from '../components/TabBarIcon';
import DetailsScreen from '../screens/DetailsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function Tabhome({ navigation, route }) {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen 
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
        }}
          name="Home" component={HomeScreen} />
        <BottomTab.Screen
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-settings" />,
          }}
          name="SettingScreen" component={SettingScreen} />
          <BottomTab.Screen
            options={{
              title: 'Details',
              tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-options" />,
            }}
            name="DetailsScreen" component={DetailsScreen}
          />
      </BottomTab.Navigator>
    );
  }

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  
    switch (routeName) {
      case 'Home':
        return 'this is HomeScreen';
      case 'SettingScreen':
        return 'this is SettingScreen';
    case 'DetailsScreen':
        return 'this is DetailsScreen';
    }
}