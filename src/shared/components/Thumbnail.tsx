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
            <Img source={{ uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400' }}
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
