import StyledProject, { StyledLargeProject, StyledMediumProject } from './Project.style';

import { useAppSelector } from '../../../redux/hooks';
import Tag from '../Tag/Tag';

export type ProjectProps = {
    name: string;
    url: string;
    description: string;
    group: string;
    screenshot?: string;
    displaySize?: number;
    skills: string[];
}

const Project = ({ name, url, description, screenshot, displaySize=1, skills }: ProjectProps) => {
    const displayMode = useAppSelector(state => state.setup.displayMode);

    let renderMessage = false;
    if (description.includes('Render.com')) {
        description = description.replace('Render.com takes time to open.', '');
        renderMessage = true;
    }

    if (displaySize === 3) {
        return (
            <StyledLargeProject href={url} target='_blank' displayMode={displayMode}>
                <div className='screenshot'><img src={require(`../../../websiteScreenshots/${screenshot}`)}/></div>
                <h4 className='name'>{ name }</h4>
                <div className='description'>{ description }</div>
                <div className='skills'>{skills.map(skill => <Tag label={skill}/>)}</div>
            </StyledLargeProject>
        );
    }

    if (displaySize === 2 && displayMode !== 'minimal') {
        return (
            <StyledMediumProject displayMode={displayMode}>
                <a className='name' href={url} target='_blank'>{ name }</a>
                <div className='description'>
                    { description } 
                    <div className='spacer'></div>
                    <div className='skills'>{skills.map(skill => <Tag label={skill}/>)}</div>
                    { renderMessage ? <div className='renderMessage'>Note: Render.com takes time to open.</div> : null }
                </div>
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