import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { editCite } from '../../../shared/Api/index';
import CalendarPicker from 'react-native-calendar-picker';
import { Picker } from '@react-native-community/picker';
import { colors } from '../../../shared/styles';
import { Button } from '../../../shared/components';
import { timeNumbers } from '../../../shared/styles'
import Toast from 'react-native-simple-toast';
type EditorContentProps = {
    params,
    reloadList: any;
    closeModal: any;
}
export const EditorContent: React.FC<EditorContentProps> = (
    { params: { Hora, Mes, DiaSemana, Dia, id, Codigo }, closeModal, reloadList },
) => { 
    let date = new Date(DiaSemana + ' ' + Mes + ' ' + Dia + ' ' +'2020')
    
    const { HOURSMILITAR, MINUTES } = timeNumbers;

    const [state, setState] = useState({
        selectedStartDate: date,
        hours: Hora.split(':')[0],
        minutes: Hora.split(':')[1],
        type: 'am',
        status: false,
    })
    const onChangeDate = (date) => {
        setState({ ...state, selectedStartDate: date.toString() })
    }
    const editarCita = async () => {
        let response = {}
        setLoading(true)
        let data = {
            id: id, 
            code: Codigo,
            dayWeek: state.selectedStartDate.toString().split(' ')[0],
            month: state.selectedStartDate.toString().split(' ')[1],
            day: state.selectedStartDate.toString().split(' ')[2],
            hour: state.hours + ':' + state.minutes,
            admin: '0',
            //hour: state.hours + ':' + state.minutes + ' ' + state.type,  //with am or pm
        }
        try {
            response = await editCite(data);
        } catch (error) {
            Toast.show('Error al ejecutar la peticion', Toast.SHORT);
            setLoading(false)
        }
        if (response === 'err') {
            Toast.show('Error al generar la cita', Toast.SHORT);
            setLoading(false)
        } else {
            setLoading(false)
            Toast.show('La cita se edito correctamente', Toast.SHORT);
            closeModal()
            reloadList()
        }
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state.selectedStartDate !== null) {
            setState({ ...state, status: true });
        } else {
            setState({ ...state, status: false });
        }
    }, [state.selectedStartDate, state.hours, state.minutes, state.type]);

    const { Item } = Picker;

    return (
        <>
            <View style={{ flexDirection: "row", paddingVertical: 20, paddingHorizontal: 10,  backgroundColor: '#2e2f33', justifyContent: 'space-between', alignItems: 'center' }} >
                <Label>Editar la cita</Label>
                <TouchableOpacity onPress={closeModal}>
                    <Label>X</Label>
                </TouchableOpacity>
            </View>
            <Container style={{marginTop: 10,}}>
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
                <Button isLoading={loading} isActivated={state.status} onClick={editarCita}>
                    Continuar
                </Button>
            </Container>
        </>
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
    color: white;
    text-align: center;
    font-size: 16px;
`