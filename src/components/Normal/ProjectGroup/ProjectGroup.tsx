import StyledProjectContainer from './ProjectGroup.style';

import type { ProjectProps } from '../Project/Project';

import Project from '../Project/Project';

type ProjectContainerProps = {
    projects: ProjectProps[];
}

const ProjectGroup = ({ projects }: ProjectContainerProps) => {
        return (
            <StyledProjectContainer>
                {
                    projects.map((project: ProjectProps) => <Project key={project.name} {...project}/>)
                }
            </StyledProjectContainer>
        );
}

export default ProjectGroup;