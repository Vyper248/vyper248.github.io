import React from 'react';
import StyledButton from './Button.style';

type ButtonProps = {
    label: string;
    onClick: () => void;
    color?: string;
    textColor?: string;
    width?: string;
    margin?: string;
}

const Button = ({label='', onClick=()=>{}, color='#CCC', textColor, width, margin}: ButtonProps) => {
    return (
        <StyledButton 
            color={color} 
            textColor={textColor}
            width={width} 
            margin={margin} 
            onClick={onClick}>{label}</StyledButton>
    );
}

export default Button;