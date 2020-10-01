import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';


export const LoginScreen = ({ navigation }) => {
    const [state, setState] = useState({
        codigo: '',
        nip: '',
    })
    return (
        <Container>
            <LogoImage source={require('../../../assets/icons/logos-udg.png')}/>
            <Label>Ingresa tus datos para continuar</Label>
            <InputText
                onChangeText={text => setState({...state, codigo: text})}
                value={state.codigo}
                keyboardType="number-pad"
                placeholder="Ingresa tu codigo"
            />
            <InputText
                onChangeText={text => setState({ ...state, nip: text })}
                value={state.nip}
                placeholder="Ingresa tu nip"
                secureTextEntry
            />
            <Button onPress={() => navigation.navigate('User')}>
                <ButtonText>Continuar</ButtonText>
            </Button>
        </Container>
    );
};
const LogoImage = styled.Image`
  margin: 0 auto;
  width: 100%;
  resize-mode: contain;
`;

const Container = styled.View`
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    display: flex;
    padding-right: 20px;
    padding-left: 20px;
`
const Label = styled.Text`
    color: #000;
    margin-top: 5px;
    margin-bottom: 5px;
`
const InputText = styled.TextInput`
    border: 1px solid gray;
    height: 40px;
    width: 100%;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
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
