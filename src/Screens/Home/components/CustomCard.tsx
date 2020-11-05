import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../shared/styles';
import { Button } from '../../../shared/components';
import Toast from 'react-native-simple-toast';

type CustomCardProps = {
    params,
    status: boolean
}

export const CustomCard: React.FC<CustomCardProps> = ({ params: { index, item } }, status) => {
    

    return (
        <ContainerItem key={index}>
            <Row>
                <Label>Carrera: {item.Carrera}</Label>
                <Label>Codigo: {item.Codigo}</Label>
            </Row>
            <Row>
                <Label>Nombre: {item.Nombre}</Label>
            </Row>
            <Row>
                <Label>Dia: {item.Dia}</Label>
                <Label>Hora: {item.Hora}</Label>
                <Label>Mes: {item.Mes}</Label>
            </Row>

            <View style={{ alignSelf: "flex-end" }}>
                <Button isLoading={false} accent={true} width={'100px'} isActivated={status} onClick={() => {
                    Toast.show('hey este es el componente de bajas', Toast.SHORT);
                }}>
                    Borrar
                </Button>
            </View>
        </ContainerItem>
                       
    );
};
const ShadowStyles = `
    shadow-color: ${colors.blackTransparentLight};
    shadow-offset: 0px 3px;
    shadow-opacity: .4;
    shadow-radius: 3px;
    elevation: 1;
`
const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
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
