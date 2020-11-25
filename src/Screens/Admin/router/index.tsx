import React, { Suspense } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/index';
import { ListCitesScreen } from '../screens/listCites';


const { Navigator, Screen } = createDrawerNavigator();
import CustomDrawer from '../components/CustomDrawer'

const Router = ({ route: { params } }) => {
    return (
        <Navigator initialRouteName="Inicio" drawerContent={props => <CustomDrawer {...props} params={params} />}>
            <Screen name="Inicio" component={ListCitesScreen} initialParams={params} />
        </Navigator>
    );
};

export default Router;