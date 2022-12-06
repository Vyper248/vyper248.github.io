import { useState } from 'react';

import StyledProjectContainer from './ProjectGroup.style';

import type { ProjectProps } from '../Project/Project';

import Project from '../Project/Project';
import CollapsibleContent from '../CollapsibleContent/CollapsibleContent';

type ProjectContainerProps = {
    projects: ProjectProps[];
    heading: string;
}

const ProjectGroup = ({ projects, heading }: ProjectContainerProps) => {
    const [open, setOpen] = useState(true);

    const toggleOpen = () => {
        setOpen(open => !open);
    }

    return (
        <StyledProjectContainer>
            <h3>{heading} <span className='faded'>&& visible === </span><span className='toggle' onClick={toggleOpen}>{open ? 'true' : 'false'}</span></h3>
            <CollapsibleContent open={open}>
                <div className='group'>
                    {
                        projects.map((project: ProjectProps) => <Project key={project.name} {...project}/>)
                    }
                </div>
            </CollapsibleContent>
        </StyledProjectContainer>
    );
}

export default ProjectGroup;