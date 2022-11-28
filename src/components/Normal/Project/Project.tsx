import StyledProject, { StyledLargeProject, StyledMediumProject } from './Project.style';

import { useAppSelector } from '../../../redux/hooks';

export type ProjectProps = {
    name: string;
    url: string;
    description: string;
    group: string;
    screenshot?: string;
    displaySize?: number;
    skills: string[];
}

const Project = ({ name, url, description, screenshot, displaySize=1 }: ProjectProps) => {
    const displayMode = useAppSelector(state => state.setup.displayMode);

    if (displaySize === 3) {
        return (
            <StyledLargeProject href={url} target='_blank' displayMode={displayMode}>
                <div className='screenshot'><img src={require(`../../../websiteScreenshots/${screenshot}`)}/></div>
                <h4 className='name'>{ name }</h4>
                <div className='description'>{ description }</div>
            </StyledLargeProject>
        );
    }

    if (displaySize === 2 && displayMode !== 'minimal') {
        return (
            <StyledMediumProject href={url} target='_blank' displayMode={displayMode}>
                <h4 className='name'>{ name }</h4>
                <div className='description'>{ description }</div>
            </StyledMediumProject>
        )
    }

    return (
        <StyledProject href={url} target='_blank' displayMode={displayMode}>
            { name }
        </StyledProject>
    );
}

export default Project;