import React, { Suspense } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/index';
import { DownScreen } from '../screens/down';


const { Navigator, Screen } = createDrawerNavigator();
import CustomDrawer from '../components/CustomDrawer'

const Router = ({ route: { params } }) => {
    return (
        <Navigator initialRouteName="Home" drawerContent={props => <CustomDrawer {...props} params={params} />}>
            <Screen name="Home" component={HomeScreen} initialParams={params}/>
            <Screen name="Down" component={DownScreen} initialParams={params} />
        </Navigator>
    );
};

export default Router;