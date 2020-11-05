import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { getCitesCode } from '../../../shared/Api/index';
import { timeNumbers } from '../../../shared/styles';
import Toast from 'react-native-simple-toast';
import { CustomCard } from '../components/CustomCard';
export const DownScreen = ({ route: { params }, navigation }) => {
    const { name, codigo, carrera } = params;

    const [state, setState] = useState({
        status: true,
        data: [],
    })

    const [loading, setLoading] = useState(false);

    const initial = async () => {
        let response = []
        setLoading(true)
        try {
            response = await getCitesCode(codigo);
        } catch (error) {
            Toast.show('Error al ejecutar la peticion', Toast.SHORT);
            setLoading(false)
        }
        if (response.length === 0) {
            setState({ ...state, data: [] })
            setLoading(false)
        } else {
            setLoading(false)
            setState({ ...state, data: response })
        }
    }
    useEffect(() => {
        initial()
    }, []);
    const onRefresh = () => {
        initial();
    }

    return (
        <Container>
            {state.data.length > 0 ? 
                <FlatList
                    refreshing={loading}
                    onRefresh={onRefresh}
                    data={state.data}
                    renderItem={(data) => {
                        return (
                            <CustomCard params={data} status={state.status} />
                        )
                    }}
                    keyExtractor={(item, index) => { return index.toString()}}
                />
            :
                <Row style={{marginTop: 15}}>
                    <Label>
                        No se encontraron citas registradas
                    </Label>
                </Row>
            }
        </Container>
    );
};
const Container = styled.SafeAreaView`
    justify-content: flex-start;
    height: 100%;
    padding-right: 20px;
    padding-left: 20px;
    margin-right: 20px;
    margin-left: 20px;
`
const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
`
const Label = styled.Text`
    margin: 3px; 
`
