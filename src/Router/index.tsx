import React, { Suspense } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/Login/screens/index';
import { HomeScreen } from '../Screens/Home/screens/index';


const { Navigator, Screen } = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Navigator mode="card">
                <Screen name="Login" component={LoginScreen}/>
                <Screen name="User" component={HomeScreen} />
            </Navigator>
        </NavigationContainer>
    );
};

export default Router;