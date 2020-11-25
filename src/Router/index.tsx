import React, { Suspense } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/Login/screens/index';
import HomeRouter from '../Screens/Home/router/index';
import AdminRouter from '../Screens/Admin/router/index';
import * as options from './options';


const { Navigator, Screen } = createStackNavigator();


const Router = () => {
    return (
        <NavigationContainer>
            <Navigator mode="card">
                <Screen name="Login" component={LoginScreen}/>
                <Screen name="Inicio" component={HomeRouter} options={options.commonScreenOptions} />
                <Screen name="Administrador" component={AdminRouter} options={options.commonScreenOptions} />
            </Navigator>
        </NavigationContainer>
    );
};

export default Router;