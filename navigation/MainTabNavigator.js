import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import AddTaskScreen from '../screens/AddTaskScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// for Home Tab
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    AddTask: AddTaskScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Todo App',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

// for Scanner Tab
const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

//Login
const LoginStack = createStackNavigator(
  { 
    Login: LoginScreen 
  },
  {
    headerMode: 'none'
  }

);

LoginStack.path = '';

//Tab Navigator
const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,

});


tabNavigator.path = '';

export default createAppContainer(createSwitchNavigator(
  {
    LoginStack,
    tabNavigator
  },
  {
    initialRouteName: 'LoginStack'
  }
));
