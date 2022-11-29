import StyledProjectContainer from './ProjectGroup.style';

import type { ProjectProps } from '../Project/Project';

import Project from '../Project/Project';

type ProjectContainerProps = {
    projects: ProjectProps[];
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

const ProjectGroup = ({ projects, filters }: ProjectContainerProps) => {
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

export default ProjectGroup;