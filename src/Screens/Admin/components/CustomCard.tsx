import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../shared/styles';
import { Button } from '../../../shared/components';
import Toast from 'react-native-simple-toast';
import { deleteCite } from '../../../shared/Api/index';


type CustomCardProps = {
    params,
    reloadList: any;
    editModal: any;
    status: boolean,
}

export const CustomCard: React.FC<CustomCardProps> = (
    { params: { index, item }, reloadList, editModal }, 
) => { 
    console.log(item.status);
    
    const [loading, setLoading] = useState(false);
    const deleteAny = async () => {
        let response = []
        setLoading(true)
        let data = {
            month: item.Mes,
            day: item.Dia,
            hour: item.Hora,
            code: item.Codigo,
            admin: '1',
        }
        
        try {
            response = await deleteCite(data);
        } catch (error) {
            Toast.show('Error al ejecutar la peticion', Toast.SHORT);
            setLoading(false)
        }
        if (response.length === 0) {
            setLoading(false)
        } else {
            reloadList()
            setLoading(false)
        }
    }
    
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

            <View style={{ flexDirection:'row', alignSelf: "flex-end" }}>
                <Button isLoading={loading} accent={true} width={'100px'} isActivated={true} onClick={deleteAny}>
                    Borrar
                </Button>
                <View style={{marginLeft:10,}}>
                    <Button isLoading={loading} secondary={true} width={'100px'} isActivated={true} onClick={() => { editModal(item)}}>
                        Editar
                    </Button>
                </View>
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
type StyleProps = {
    status?: string;
};
const ContainerItem = styled.View<StyleProps>`
    ${ShadowStyles}
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${props => props.status === 'deleted' ? colors.error : colors.white};
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    padding-top: 20px;
`
const Label = styled.Text`
    margin: 3px; 
`
