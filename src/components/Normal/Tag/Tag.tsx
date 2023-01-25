import React from 'react';
import StyledTag from './Tag.style';

type TagProps = {
    label: string;
}

const Tag = ({label}: TagProps) => {
    return (
        <StyledTag>{label}</StyledTag>
    );
}

export default Tag;