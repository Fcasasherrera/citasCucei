import React, { useState, useEffect } from 'react';
import { View, Modal } from 'react-native';
import styled from 'styled-components/native';
import { loginUDG, loginAdmin, registerAdmin } from '../../../shared/Api/index';
import Toast from 'react-native-simple-toast';
import { Button } from '../../../shared/components';
import { SwipeableModal } from 'react-native-swipeable-modal';
import { colors, timeNumbers } from '../../../shared/styles';
import { Picker } from '@react-native-community/picker';

export const LoginScreen = ({ navigation }) => {
    const { CARREERS } = timeNumbers;
    const [state, setState] = useState({
        codigo: '214804641',
        nip: 'virtualnba7',
        status: false,
    })
    const [stateAdmin, setStateAdmin] = useState({
        user: '',
        pass: '',
        status: false,
    })
    const [stateRegister, setStateRegister] = useState({
        user: '',
        pass: '',
        carrera: 'INNI',
    })
    const [registerAdminModal, setRegisterAdminModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState(false)
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
            if (!admin) {
                response = await loginUDG(state)
            } else {
                response = await loginAdmin(stateAdmin)
            }
        } catch (error) {
            // Toast.show('Datos no encontrados', Toast.SHORT);
            setLoading(false)
        }
        if (response === 'err') {
            Toast.show('Datos no encontrados', Toast.SHORT);
            setLoading(false)
        } else {
            setLoading(false)
            if (!admin) {
                navigation.replace('Inicio', response)
            } else {
                console.log(response);
                navigation.replace('Administrador', response)
            }

        }
    }
    const register = async () => {
        let response = {}
        setLoading(true)
        try {
            response = await registerAdmin(stateRegister)
        } catch (error) {
            // Toast.show('Datos no encontrados', Toast.SHORT);
            setLoading(false)
        }
        if (response === 'err') {
            // Toast.show('Datos no encontrados', Toast.SHORT);
            setLoading(false)
        } else {
            setLoading(false)
            setStateAdmin({...stateAdmin, user: stateRegister.user, pass: stateRegister.pass})
            setRegisterAdminModal(false)
            login()
        }
    }
    const { Item } = Picker;

    return (
        <Container>
            <LogoImage source={require('../../../assets/icons/logos-udg.png')}/>
            <Label>Ingresa tus datos para continuar</Label>
            {!admin ? 
                <>
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
                </>
            :
                <>
                    <InputText
                        onChangeText={text => setStateAdmin({ ...stateAdmin, user: text })}
                        value={stateAdmin.user}
                        keyboardType="number-pad"
                        placeholder="Ingresa tu usuario"
                    />
                    <InputText
                        onChangeText={text => {
                            setStateAdmin({ ...stateAdmin, pass: text })
                        }}
                        value={stateAdmin.pass}
                        placeholder="Ingresa tu contraseña"
                        secureTextEntry
                    />
                </>
            }
            <Button isLoading={loading} isActivated={state.status} onClick={login}>
                Continuar
            </Button>
                
            <BottomBox>
                <Row>
                    <View>
                        <Button outline={true} secondary={true} onClick={() => { setAdmin(!admin) }}>Ingresar como {admin ? 'alumno' : 'administrador'}</Button>
                    </View>
                </Row>
                {admin &&
                    <Row>
                        <View>
                            <Button outline={true} secondary={true} onClick={() => { setRegisterAdminModal(true) }}>Registrar administrador</Button>
                        </View>
                    </Row>
                }
            </BottomBox>
            {registerAdminModal &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={registerAdminModal}
                    onRequestClose={() => {
                        setRegisterAdminModal(false)
                    }}
                >
                    <SwipeableModal
                        closeModal={() => setRegisterAdminModal(false)}
                        style={{
                            backgroundColor: 'rgba(0,0,0,.4)',
                            justifyContent: 'center',
                        }}
                    >
                    <Container style={{ backgroundColor: colors.white, justifyContent: 'center', }}>
                        <LogoImage source={require('../../../assets/icons/logos-udg.png')} />
                        <Label>Ingresa los datos para continuar con el registro</Label>                            
                            <InputText
                                onChangeText={text => setStateRegister({ ...stateRegister, user: text })}
                                value={stateRegister.user}
                                keyboardType="number-pad"
                                placeholder="Ingresa tu usuario"
                            />
                            <InputText
                                onChangeText={text => {
                                    setStateRegister({ ...stateRegister, pass: text })
                                }}
                                value={stateRegister.pass}
                                placeholder="Ingresa tu contraseña"
                                secureTextEntry
                            />
                            <Label>Selecciona la carrera</Label>                            
                            <View style={{ flexDirection: "row", paddingHorizontal: 64, marginTop: -42 }} >
                                <Picker
                                    selectedValue={stateRegister.carrera}
                                    style={{ flex: 1, }}
                                    onValueChange={(itemValue: any) =>
                                        setStateRegister({ ...stateRegister, carrera: itemValue })
                                    }>
                                    {CARREERS.map((value, index) => {
                                        return (
                                            <Item key={index} label={value.toString()} value={value.toString()} />
                                        )
                                    })}
                                </Picker>
                            </View>
                            <Row style={{ justifyContent: 'center', backgroundColor: 'white', paddingBottom: 8, marginTop: -42 }}>
                                <Button isLoading={loading} isActivated={true} onClick={register}>
                                    Registrar
                                </Button>
                            </Row>

                            <Row style={{ justifyContent: 'center', backgroundColor: 'white', }}>
                                <Button isLoading={loading} secondary={true} isActivated={true} onClick={() => { setRegisterAdminModal(false)}}>
                                    Cancelar
                                </Button>
                            </Row>
                        </Container>
                    </SwipeableModal>
                </Modal>
            }
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
export const Label = styled.Text`
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
const BottomBox = styled.View`
    align-items: center;
    justify-content: flex-start;
    display: flex;
    width: 100%;
    height: 20%;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 80px;
`
const Row = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`