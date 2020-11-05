import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { loginUDG } from '../../../shared/Api/index';
import Toast from 'react-native-simple-toast';
import { Button } from '../../../shared/components';


export const LoginScreen = ({ navigation }) => {
    const [state, setState] = useState({
        codigo: '214804641',
        nip: 'virtualnba7',
        status: false,
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state.codigo !== '' && state.nip !== '') {
            setState({ ...state, status: true });
        } else {
            setState({ ...state, status: false });
        }
    }, [state.codigo, state.nip]);

    const login = async () => {
        let response = {}
        setLoading(true)
        try {
            response = await loginUDG(state)
        } catch (error) {
            Toast.show('Datos no encontrados', Toast.SHORT);
            setLoading(false)
        }
        if (response === 'err') {
            Toast.show('Datos no encontrados', Toast.SHORT);
            setLoading(false)
        } else {
            setLoading(false)
            navigation.replace('Inicio', response)
        }
    }

    return (
        <Container>
            <LogoImage source={require('../../../assets/icons/logos-udg.png')}/>
            <Label>Ingresa tus datos para continuar</Label>
            <InputText
                onChangeText={text => setState({ ...state, codigo: text})}
                value={state.codigo}
                keyboardType="number-pad"
                placeholder="Ingresa tu codigo"
            />
            <InputText
                onChangeText={text => {
                    setState({ ...state, nip: text })
                }}
                value={state.nip}
                placeholder="Ingresa tu nip"
                secureTextEntry
            />
            <Button isLoading={loading} isActivated={state.status} onClick={login}>
                Continuar
            </Button>
                
            {/* <LogoImage source={require('../../../assets/icons/dual.png')} /> */}
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
