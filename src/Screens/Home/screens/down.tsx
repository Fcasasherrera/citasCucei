import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { insertCite } from '../../../shared/Api/index';
import { colors, timeNumbers } from '../../../shared/styles';
import { Button } from '../../../shared/components';
import Toast from 'react-native-simple-toast';
export const DownScreen = ({ route: { params }, navigation }) => {
    const { name, codigo, carrera } = params;
    const { HOURSMILITAR } = timeNumbers;

    const [state, setState] = useState({
        status: true,
    })

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (state.selectedStartDate !== '') {
    //         setState({ ...state, status: true });
    //     } else {
    //         setState({ ...state, status: false });
    //     }
    // }, [state.selectedStartDate, state.hours, state.minutes, state.type]);

    return (
        <Container>
            <FlatList
                data={HOURSMILITAR}
                renderItem={({ item, index }) => {
                    return (
                        <ContainerItem key={index}>
                            <Label>12</Label>
                            <Label>12:45</Label>
                            <Label>Nov</Label>
                            <View style={{alignSelf: "flex-end"}}>
                                <Button isLoading={false} accent={true} width={'100px'} isActivated={state.status} onClick={() => {
                                    Toast.show('hey este es el componente de bajas', Toast.SHORT);
                                }}>
                                    Borrar
                                </Button>
                            </View>
                        </ContainerItem>                    
                    )
                }}
                keyExtractor={(item, index) => { return index.toString()}}
            />
        </Container>
    );
};
const ShadowStyles = `
    shadow-color: ${colors.blackTransparentLight};
    shadow-offset: 0px 3px;
    shadow-opacity: .4;
    shadow-radius: 3px;
    elevation: 1;
`
const Container = styled.SafeAreaView`
    justify-content: flex-start;
    height: 100%;
    padding-right: 20px;
    padding-left: 20px;
    margin-right: 20px;
    margin-left: 20px;
`
const ContainerItem = styled.View`
    ${ShadowStyles}
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${colors.white};
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    padding-top: 20px;
`
const Label = styled.Text`
    margin: 3px; 
`
