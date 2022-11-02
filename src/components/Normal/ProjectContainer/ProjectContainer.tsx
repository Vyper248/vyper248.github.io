import StyledProjectContainer from './ProjectContainer.style';

import { ProjectProps } from '../Project/Project';

import Project from '../Project/Project';

type ProjectContainerProps = {
    projects: ProjectProps[];
}

const ProjectContainer = ({ projects }: ProjectContainerProps) => {
    return (
        <StyledProjectContainer>
            {
                projects.map((project: ProjectProps) => {
                    return <Project key={project.name} {...project}/>
                })
            }
        </StyledProjectContainer>
    );
}

export default ProjectContainer;