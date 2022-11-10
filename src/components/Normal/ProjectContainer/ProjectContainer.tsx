import StyledProjectContainer, { StyledProjectGroup } from './ProjectContainer.style';

import { getGroups } from '../../../utils/utils';

import { ProjectProps } from '../Project/Project';

import Project from '../Project/Project';

type ProjectContainerProps = {
    projects: ProjectProps[];
    group?: boolean;
}

const ProjectContainer = ({ projects, group=false }: ProjectContainerProps) => {
    if (group) {
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
    
    const groups = getGroups(projects) as {[key: string]: ProjectProps[]};
    
    return (
        <>
            {
                Object.keys(groups).map((groupName: string) => {
                    let groupProjects = groups[groupName];
                    return (
                        <StyledProjectGroup key={groupName}>
                            <h3>{groupName}</h3>
                            <ProjectContainer projects={groupProjects} group={true}/>
                        </StyledProjectGroup>
                    );
                })
            }
        </>
    );
}

export default ProjectContainer;