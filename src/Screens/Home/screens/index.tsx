import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';


export const HomeScreen = ({ navigation }) => {
    return (
        <Container>
            <Label>Home Screen</Label>
            <Button onPress={() => navigation.goBack()}>
                <ButtonText>Regresar</ButtonText>
            </Button>
        </Container>
    );
};

const Container = styled.View`
    align-items: center;
    justify-content: center;
    height: 100%;
`
const Label = styled.Text`
    color: #000;
`
const Button = styled.TouchableOpacity`
    border: 1px solid #64b5f6;
    background-color: #64b5f6;
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
