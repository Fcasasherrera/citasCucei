import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';


export const HomeScreen = ({ route: {params}, navigation }) => {
    const { name, codigo } = params;
    return (
        <Container>
            <Label>Home Screen</Label>
            <View  style={{flexDirection: "row"}} >
                <Label style={{ color: 'red' }}>Nombre: </Label> 
                <Label>{name}</Label>
            </View>
            <View style={{ flexDirection: "row" }} >
                <Label style={{ color: 'red' }}>Codigo: </Label>
                <Label>{codigo}</Label>
            </View>
            <Button onPress={() => navigation.replace('Login')}>
                <ButtonText>Regresar</ButtonText>
            </Button>
        </Container>
    );
};

const Container = styled.View`
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-right: 20px;
    padding-left: 20px;
`
const Label = styled.Text`
    color: #000;
`
const Button = styled.TouchableOpacity`
    background-color: pink;
    height: 40px;
    width: 100%;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
`
const ButtonText = styled.Text`
    color: #fff;
    margin-top: 5px;
    margin-bottom: 5px;
`
