import StyledProjectContainer, { StyledProjectGroup } from './ProjectContainer.style';

import { getGroups } from '../../../utils/utils';

import { ProjectProps } from '../Project/Project';

import Project from '../Project/Project';

type ProjectContainerProps = {
    projects: ProjectProps[];
    group?: boolean;
    filters: string[];
}

const checkFilters = (project: ProjectProps, filters: string[]) => {
    if (filters.length === 0) return true;

    let alwaysUsed = new Set(['JavaScript', 'HTML5', 'CSS3']);

    let projectSkills = new Set(project.skills);
    let filterCheck = true;

    for (let i = 0; i < filters.length; i++) {
        let filter = filters[i];

        //no point adding these to every project, so just ignore
        if (alwaysUsed.has(filter)) continue;
        
        if (!projectSkills.has(filter)) {
            filterCheck = false;
            break;
        } 
    }

    return filterCheck;
}

const ProjectContainer = ({ projects, filters, group=false }: ProjectContainerProps) => {
    if (group) {
        return (
            <StyledProjectContainer>
                {
                    projects.map((project: ProjectProps) => {
                        if (checkFilters(project, filters)) return <Project key={project.name} {...project}/>
                        else return null;
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
                            <ProjectContainer projects={groupProjects} filters={filters} group={true}/>
                        </StyledProjectGroup>
                    );
                })
            }
        </>
    );
}

export default ProjectContainer;