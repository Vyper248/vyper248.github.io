import { useState } from 'react';
import StyledProject from './Project.style';

export type ProjectProps = {
    name: string;
    url: string;
    description: string;
    group: string;
}

const Project = ({ name, url, description, group }: ProjectProps) => {
    return (
        <StyledProject href={url} target='_blank'>
            { name }
        </StyledProject>
    );
}

export default Project;