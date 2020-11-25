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
            <Img source={{ uri: 'https://lh3.googleusercontent.com/proxy/zzudlpqsSTVtxL5roDac8-KcniSn28jYn7BzUrRRfKTEDq2i3p2fBr_PSymLeMuZTOfsfMTrhutnBN3AhFS-sfWoibVIfEZqn2Kxe3RwKZ5kQz-8cgpPVkkmIGcnhJjoxy0hAo0GfIz4-24kUE8trZ5LxdeJ8Y3q39_kPcs' }}
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
