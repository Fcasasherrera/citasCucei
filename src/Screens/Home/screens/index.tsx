import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import CalendarPicker from 'react-native-calendar-picker';
import { Picker } from '@react-native-community/picker';
import { colors } from '../../../shared/styles';

export const HomeScreen = ({ route: {params}, navigation }) => {
    const { name, codigo } = params;
    const [ state, setState ] = useState({
        selectedStartDate: '',
        hours: '8',
        minutes: '00',
        type: 'am'
    })
    const onChangeDate = (date) => {
        setState({ ...state, selectedStartDate: date.toString() })
    }
    const generateCite = () => {
        console.log(state.hours, ':', state.minutes, ' ', state.type, ' ',  state.selectedStartDate);
    }

    const { Item } = Picker;

    return (
        <Container>
            <CalendarPicker
                onDateChange={(data) => onChangeDate(data)}
                previousTitle="<"
                nextTitle=">"
                todayBackgroundColor={colors.primary}
            />
            <View  style={{flexDirection: "row", marginTop: 20,}} >
                <Label style={{ color: 'red' }}>Fecha seleccionada:</Label> 
                <Label>{state.selectedStartDate}</Label>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20, }} >
                <Picker
                    selectedValue={state.hours}
                    style={{ flex: 1, }}
                    onValueChange={(itemValue:any, itemIndex) =>
                        setState({ ...state, hours: itemValue })
                    }>
                    <Item label="8" value="8" />
                    <Item label="9" value="9" />
                </Picker>
                <Picker
                    selectedValue={state.minutes}
                    style={{ flex: 1, }}
                    onValueChange={(itemValue: any, itemIndex) =>
                        setState({ ...state, minutes: itemValue })
                    }>
                    <Item label="00" value="00" />
                    <Item label="15" value="15" />
                </Picker>
                <Picker
                    selectedValue={state.type}
                    style={{ flex: 1, }}
                    onValueChange={(itemValue: any, itemIndex) =>
                        setState({ ...state, type: itemValue })
                    }>
                    <Item label="am" value="am" />
                    <Item label="pm" value="pm" />
                </Picker>
            </View>
            <Button onPress={() => generateCite()}>
                <ButtonText>Generar Cita</ButtonText>
            </Button>
            {/* <Button onPress={() => navigation.replace('Login')}>
                <ButtonText>Regresar</ButtonText>
            </Button> */}
        </Container>
    );
};

const Container = styled.View`
    align-items: center;
    justify-content: flex-start;
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
