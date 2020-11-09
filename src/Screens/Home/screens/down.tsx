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
                            <CustomCard params={data} status={state.status} reloadList={() => {initial()}} />
                        )
                    }}
                    keyExtractor={(item, index) => { return index.toString()}}
                />
            :
                <FlatList
                    refreshing={loading}
                    onRefresh={onRefresh}
                    data={[1]}
                    renderItem={(data) => {
                        return (
                            <Row style={{ marginTop: 15, justifyContent: 'center', backgroundColor: 'white', padding: 25, borderRadius: 16, }}>
                                <Label style={{textAlign: 'center'}}>
                                    No se encontraron citas registradas
                                </Label>
                            </Row>
                        )
                    }}
                    keyExtractor={(item, index) => { return index.toString()}}
                />
                
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
