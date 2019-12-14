/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { View, Text } from 'react-native';

import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';


import {
    createStackNavigator,
} from 'react-navigation-stack';


import Login from './src/screens/Login';
import TimesheetLogger from './src/screens/TimesheetLogger'


const Main = createStackNavigator(
    {
        Home: { screen: Login },
        Logger: { screen: TimesheetLogger }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
    }
);

const Routes = createSwitchNavigator(
    {
        //Switch: { screen: SwitchScreen },
        Login: Main,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
    }
);

export default RouteContainer = createAppContainer(Routes);
