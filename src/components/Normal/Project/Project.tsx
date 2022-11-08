import { useState } from 'react';
import StyledProject, { StyledLargeProject, StyledMediumProject } from './Project.style';

export type ProjectProps = {
    name: string;
    url: string;
    description: string;
    group: string;
    screenshot?: string;
    displaySize?: number;
}

const Project = ({ name, url, description, screenshot, displaySize=1 }: ProjectProps) => {

    if (displaySize === 3) {
        return (
            <StyledLargeProject href={url} target='_blank'>
                <div className='screenshot'><img src={require(`../../../websiteScreenshots/${screenshot}`)}/></div>
                <h4 className='name'>{ name }</h4>
                <div className='description'>{ description }</div>
            </StyledLargeProject>
        );
    }

    if (displaySize === 2) {
        return (
            <StyledMediumProject href={url} target='_blank'>
                <h4 className='name'>{ name }</h4>
                <div className='description'>{ description }</div>
            </StyledMediumProject>
        )
    }

    return (
        <StyledProject href={url} target='_blank'>
            { name }
        </StyledProject>
    );
}

export default Project;