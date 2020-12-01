import React from 'react';
import { DotIndicator } from 'react-native-indicators';
import styled from 'styled-components/native';
import { colors } from '../styles';

type ButtonProps = {
    outline?: boolean;
    secondary?: boolean;
    accent?: boolean;
    isActivated?: boolean;
    width?: string;
    margin?: string;
    isLoading?: boolean;
    onClick: any;
};

export const Thumbnail: React.FC<ButtonProps> = ({
    
}) => {
    return (
        <ThumbnailButton>
            <Img source={{ uri: 'http://www.web.valles.udg.mx/sites/default/files/49159786_10156557180466542_4776876890197590016_n.jpg' }}
                resizeMode='cover' />
        </ThumbnailButton>
    )
};

type StyleProps = {
    margin?: string;
    width?: string;
    outline: boolean;
    secondary: boolean;
    accent: boolean;
    isActivated: boolean;
};

const ThumbnailButton = styled.TouchableOpacity<StyleProps>`
    width: 120px;
    height: 120px;
    align-self: center;
    box-shadow: 3px 3px 2px ${colors.blackTransparentLight};
`
const Img = styled.Image<StyleProps>`
    width: 120px;
    height: 120px;
    border-radius: 150px;
`
