import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
// import FIcon from 'react-native-vector-icons/Feather';
import { spacings, colors } from '../shared/styles';
import styled from 'styled-components/native';
import { DrawerActions } from '@react-navigation/native';

export const commonScreenOptions = ({ navigation }): StackNavigationOptions => ({
  headerTitleAlign: 'center',
  
  headerLeftContainerStyle: {
    paddingHorizontal: spacings.right,
  },
  headerRightContainerStyle: {
    paddingHorizontal: spacings.right,
  },
  headerTitleStyle: {
    color: colors.black,
  },
  headerStyle: {
    backgroundColor: colors.white,
  },
  headerBackTitle: null,
  headerBackTitleVisible: false,
  headerLeft: () => (
    <IconContainer onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      {/* <FIcon name="menu" size={24} color={colors.primary} /> */}
      {/* <Label>Menu</Label> */}
      <ImgIcon source={require('../assets/icons/menu.png')} />
    </IconContainer>
  ),
});
const IconContainer = styled.TouchableOpacity.attrs(props => ({}))`
  padding: 8px;
  border-radius: 50px;
`;
const ImgIcon = styled.Image`
    width: 24px;
    height: 24px;
    resize-mode: contain;
`
const Label = styled.Text`
    color: #000;
    margin-top: 5px;
    margin-bottom: 5px;
`