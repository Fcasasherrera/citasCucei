import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import { Thumbnail } from '../../../shared/components/Thumbnail';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

interface CustomDrawerProps {
    params,
}

const CustomDrawer = (props: CustomDrawerProps) => {
    const navigation = useNavigation()
    const { name, codigo } = props.params;
    return (
        <>
            <Container>
                <Thumbnail onClick={() => { }} width={'40px'} />
                <Label>{name}</Label>
                <Label>{codigo}</Label>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Help"
                        onPress={() => Linking.openURL('https://github.com/Fcasasherrera')}
                    />
                    <DrawerItem
                        label="Cerrar Sesión"
                        onPress={() => navigation.replace('Login')}
                    />
                </DrawerContentScrollView>
            </Container>
        </>
    );
};

export default CustomDrawer;
const Container = styled.View`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
`
const Label = styled.Text`
    align-self: center;
    text-align: center;
    font-size: 12px;
    margin-top: 8px;
    text-transform: capitalize;
`
