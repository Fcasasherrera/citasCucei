import React, { useState, useEffect } from 'react';
import { FlatList, Modal, View } from 'react-native';
import styled from 'styled-components/native';
import { getCitesFilter } from '../../../shared/Api/index';
import { timeNumbers, colors } from '../../../shared/styles';
import Toast from 'react-native-simple-toast';
import { CustomCard } from '../components/CustomCard';
import { EditorContent } from '../components/EditorContent';
import { SwipeableModal } from 'react-native-swipeable-modal';
import { Button } from '../../../shared/components';
import { Picker } from '@react-native-community/picker';

export const ListCitesScreen = ({ route: { params }, navigation }) => {
    const { name, codigo, carrera } = params;
    const { DAYSWEEK, DAYS } = timeNumbers;
    const [state, setState] = useState({
        status: true,
        data: [],
        dayWeek: '-',
        day: '-'
    })
    const filterTrigger = () => {
        setFilterModal(false)
        let data = {
            dayWeek: state.dayWeek,
            day: state.day,
        }
        initial(data)
    }

    const [loading, setLoading] = useState(false);

    const initial = async (params) => {
        let response = []
        setLoading(true)
        try {
            response = await getCitesFilter(params, carrera);
        } catch (error) {
            Toast.show('Error al ejecutar la peticion', Toast.SHORT);
            setLoading(false)
        }
        if (response.length === 0) {
            setState({ ...state, data: [] })
            setLoading(false)
        } else {
            setLoading(false)
            const result = response.filter(word => word.status !== 'deleted');
            setState({ ...state, data: result })
        }
    }
    useEffect(() => {
        initial({})
    }, []);
    const onRefresh = () => {
        initial({});
    }
    const reset = () => {
        setFilterModal(false); 
        setState({ ...state, dayWeek: '-', day: '-'})
        initial({})
    }
    
    const [filterModal, setFilterModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({});
    const showEditModal = async (data) => {
        setEditData(data)
        setEditModal(true)
    }
    const { Item } = Picker;

    return (
        <Container>
            <Row style={{ justifyContent: 'center', backgroundColor: 'white', padding: 16, }}>
                <Button isLoading={loading} secondary={true} isActivated={true} onClick={() => { setFilterModal(true) }}>
                    Filtrar fechas
                </Button>
            </Row>
            <InternalContainer>
                {state.data.length > 0 ? 
                    <FlatList
                        refreshing={loading}
                        onRefresh={onRefresh}
                        data={state.data}
                        renderItem={(data) => {
                            return (
                                <CustomCard params={data} status={state.status} reloadList={() => { initial({}) }} 
                                editModal={(data) => {
                                    showEditModal(data)
                                }}  />
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
            </InternalContainer>
            {editModal &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editModal}
                    onRequestClose={() => {
                        setEditModal(false)
                    }}
                >
                    <SwipeableModal
                        closeModal={() => setEditModal(false)}
                        style={{
                            backgroundColor: 'rgba(0,0,0,.4)',
                            justifyContent: 'center',
                        }}
                    >
                        <Container style={{ backgroundColor: colors.white,}}>
                        <EditorContent params={editData} closeModal={() => { setEditModal(false) }} reloadList={() => { initial({}) }} />
                        </Container>
                    </SwipeableModal>
                </Modal>
            }
            {filterModal &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={filterModal}
                    onRequestClose={() => {
                        setFilterModal(false)
                    }}
                >
                    <SwipeableModal
                        closeModal={() => setFilterModal(false)}
                        style={{
                            backgroundColor: 'rgba(0,0,0,.4)',
                            justifyContent: 'center',
                        }}
                    >
                        <Container style={{ backgroundColor: colors.white, justifyContent: 'center', }}>
                            <Label style={{ textAlign: 'center', fontSize: 24, color: colors.black, marginBottom: 16, }}>
                                Filtros
                            </Label>
                            <Label style={{ textAlign: 'center', fontSize: 16, color: colors.primary }}>
                                Dias del mes
                            </Label>
                            <View style={{ flexDirection: "row", paddingHorizontal: 64, marginTop: -42 }} >
                                <Picker
                                    selectedValue={state.day}
                                    style={{ flex: 1, }}
                                    onValueChange={(itemValue: any) =>
                                        setState({ ...state, day: itemValue })
                                    }>
                                    {DAYS.map((value, index) => {
                                        return (
                                            <Item key={index} label={value.toString()} value={value.toString()} />
                                        )
                                    })}
                                </Picker>
                            </View>
                            <Label style={{ textAlign: 'center', fontSize: 16, color: colors.primary }}>
                                Dias de la semana
                            </Label>
                            <View style={{ flexDirection: "row", paddingHorizontal: 64, marginTop: -42 }} >
                                <Picker
                                    selectedValue={state.dayWeek}
                                    style={{ flex: 1, }}
                                    onValueChange={(itemValue: any) =>
                                        setState({ ...state, dayWeek: itemValue })
                                    }>
                                    {DAYSWEEK.map((value, index) => {
                                        return (
                                            <Item key={index} label={value.label.toString()} value={value.value.toString()} />
                                        )
                                    })}
                                </Picker>
                            </View>
                            <Row style={{ justifyContent: 'center', backgroundColor: 'white', padding: 25, }}>
                                <Button isLoading={loading} isActivated={true} onClick={filterTrigger}>
                                    Filtrar
                                </Button>
                            </Row>
                            <Row style={{ justifyContent: 'center', backgroundColor: 'white', padding: 25, }}>
                                <Button isLoading={loading} secondary={true} isActivated={true} onClick={reset}>
                                    Borrar Filtros
                                </Button>
                            </Row>
                        </Container>
                    </SwipeableModal>
                </Modal>
            }
        </Container>
    );
};
const Container = styled.SafeAreaView`
    justify-content: flex-start;
    height: 100%;
    padding-right: 20px;
    padding-left: 20px;
`
const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
`
const Label = styled.Text`
    margin: 3px; 
`
const InternalContainer = styled.View`
    justify-content: flex-start;
    height: 100%;
    padding-right: 20px;
    padding-left: 20px;
`
