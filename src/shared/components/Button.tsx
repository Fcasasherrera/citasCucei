import React from 'react';
import { DotIndicator } from 'react-native-indicators';
import styled from 'styled-components/native';
import { colors } from '../styles';

type ButtonProps = {
    outline?: boolean;
    secondary?: boolean;
    accent?: boolean;
    isActivated?: boolean;
    onClick: any;
    width?: string;
    margin?: string;
    isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
    children,
    isLoading = false,
    outline,
    onClick,
    secondary,
    accent,
    width,
    isActivated = true,
    margin,
}) => {
    return !isLoading && isActivated ? (
        <ButtonContainer
            outline={outline}
            onPress={onClick}
            secondary={secondary}
            width={width}
            accent={accent}
            margin={margin}
            underlayColor={
                outline
                    ? colors.white
                    : accent
                        ? colors.primary
                        : secondary
                            ? colors.primary
                            : colors.accent
            }>
            <Label outline={outline}>{children}</Label>
        </ButtonContainer>
    ) : (
            <ButtonDeactivaded width={width} isActivated={isActivated} margin={margin}>
                {isActivated ? (
                    <DotIndicator color={colors.white} size={10} count={3} />
                ) : (
                        <Label>{children}</Label>
                    )}
            </ButtonDeactivaded>
        );
};

type StyleProps = {
    margin?: string;
    width?: string;
    outline: boolean;
    secondary: boolean;
    accent: boolean;
    isActivated: boolean;
};

const Label = styled.Text<StyleProps>`
  color: ${props => (!props.outline ? colors.white : colors.primary)};
  align-self: center;
  padding: 10px;
`;

const BaseButtonStyles = `
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  max-height: 40px;
  margin-top: 5px;
`;

const ButtonContainer = styled.TouchableOpacity<StyleProps>`
  ${BaseButtonStyles}
  width: ${props => (props.width ? props.width : '100%')};
  background-color: ${props =>
        props.accent
            ? colors.accent
            : props.outline
                ? colors.lightGray
                : props.secondary
                    ? colors.primaryLigth
                    : colors.primary};
  ${props => props.margin && `margin: ${props.margin}`};
`;

const ButtonDeactivaded = styled.View<StyleProps>`
  ${BaseButtonStyles}
  background-color: ${colors.blackLigth};
  width: ${props => (props.width ? props.width : '100%')};
  ${props => props.isActivated && 'min-height: 40px;'}
`;
