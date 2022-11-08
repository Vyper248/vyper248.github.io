import React from 'react';
import StyledButton from './Button.style';

type ButtonProps = {
    label: string;
    onClick: () => void;
    color?: string;
    textColor?: string;
    width?: string;
    margin?: string;
    selected?: boolean;
}

const Button = ({label='', onClick=()=>{}, color='#CCC', ...rest}: ButtonProps) => {
    return (
        <StyledButton 
            color={color}
            onClick={onClick}
            {...rest}>{label}</StyledButton>
    );
}

export default Button;