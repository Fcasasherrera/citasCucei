import React, { Suspense } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/index';


const { Navigator, Screen } = createDrawerNavigator();
import CustomDrawer from '../components/CustomDrawer'

const Router = ({ route: { params } }) => {
    return (
        <Navigator initialRouteName="Home" drawerContent={props => <CustomDrawer {...props} params={params} />}>
            <Screen name="Home" component={HomeScreen} initialParams={params}/>
        </Navigator>
    );
};

export default Router;