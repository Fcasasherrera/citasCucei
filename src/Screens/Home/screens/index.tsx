import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { insertCite } from '../../../shared/Api/index';
import CalendarPicker from 'react-native-calendar-picker';
import { Picker } from '@react-native-community/picker';
import { colors } from '../../../shared/styles';
import { Button } from '../../../shared/components';
import { timeNumbers } from '../../../shared/styles'
import Toast from 'react-native-simple-toast';
export const HomeScreen = ({ route: { params }, navigation }) => {
    const { name, codigo, carrera } = params;
    const { HOURSMILITAR, MINUTES } = timeNumbers;

    const [state, setState] = useState({
        selectedStartDate: '',
        hours: '08',
        minutes: '00',
        type: 'am',
        status: false,
    })
    const onChangeDate = (date) => {
        setState({ ...state, selectedStartDate: date.toString() })
    }
    const generateCite = async () => {
        setLoading(true);
        let data = { 
            dayWeek: state.selectedStartDate.split(' ')[0], 
            month: state.selectedStartDate.split(' ')[1], 
            day: state.selectedStartDate.split(' ')[2], 
            //hour: state.hours + ':' + state.minutes + ' ' + state.type,  //with am or pm
            hour: state.hours + ':' + state.minutes,
            code: codigo, 
            name, 
            carreer: carrera 
        }
        let response = {}
        try {
            response = await insertCite(data)
        } catch (error) {
            Toast.show('Error al generar la cita', Toast.SHORT);
            setLoading(false)
        }
        if (response === 'err') {
            Toast.show('Error al generar la cita', Toast.SHORT);
            setLoading(false)
        } else if (response === 'ya existe la cita') {
            Toast.show('La cita ya existe', Toast.SHORT);
            setLoading(false)
        }
        else {
            setLoading(false)
            Toast.show('La cita se registro correctamente', Toast.SHORT);
        }
        setLoading(false);
    }
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state.selectedStartDate !== '') {
            setState({ ...state, status: true });
        } else {
            setState({ ...state, status: false });
        }
    }, [state.selectedStartDate, state.hours, state.minutes, state.type]);

    const { Item } = Picker;

    return (
        <Container>
            <CalendarPicker
                onDateChange={(data) => onChangeDate(data)}
                previousTitle="<"
                nextTitle=">"
                selectedDayColor={colors.pink}
                todayBackgroundColor={colors.primary}
            />
            <View style={{ flexDirection: "row", marginTop: 20, }} >
                
                <Picker
                    selectedValue={state.hours}
                    style={{ flex: 1, }}
                    onValueChange={(itemValue: any) =>
                        setState({ ...state, hours: itemValue })
                    }>
                    {HOURSMILITAR.map((value, index) => {
                        return (
                            <Item key={index} label={value.toString()} value={value.toString()} />
                        )
                    })}
                </Picker>
                <Picker
                    selectedValue={state.minutes}
                    style={{ flex: 1, }}
                    onValueChange={(itemValue: any) =>
                        setState({ ...state, minutes: itemValue })
                    }>
                    {MINUTES.map((value, index) => {
                        return (
                            <Item key={index} label={value} value={value} />
                        )
                    })}
                </Picker>
                {/* <Picker
                    selectedValue={state.type}
                    style={{ flex: 1, }}
                    onValueChange={(itemValue: any) =>
                        setState({ ...state, type: itemValue })
                    }>
                    <Item label="am" value="am" />
                    <Item label="pm" value="pm" />
                </Picker> */}
            </View>
            <Button isLoading={loading} isActivated={state.status} onClick={generateCite}>
                Generar Cita
            </Button>
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