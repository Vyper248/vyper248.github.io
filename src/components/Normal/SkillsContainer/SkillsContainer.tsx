import StyledSkillsContainer from './SkillsContainer.style';
import { StyledProjectGroup } from '../ProjectContainer/ProjectContainer.style';

import { getGroups } from '../../../utils/utils';

import Skill from '../Skill/Skill';

type SkillsContainerProps = {
    skills: ProjectProps[];
    group?: boolean;
    filters: string[];
    toggleFilter: (value: string) => () => void;
}

type ProjectProps = {
    name: string;
    group: string;   
}

const SkillsContainer = ({ skills, filters, toggleFilter, group=false }: SkillsContainerProps) => {
    if (group) {
        return (
            <StyledSkillsContainer>
                {
                    skills.map((project: ProjectProps) => {
                        return <Skill key={project.name} filters={filters} toggleFilter={toggleFilter} {...project}/>
                    })
                }
            </StyledSkillsContainer>
        );
    }
    
    const groups = getGroups(skills) as {[key: string]: ProjectProps[]};

    return (
        <>
            {
                Object.keys(groups).map((groupName: string) => {
                    let groupProjects = groups[groupName];
                    return (
                        <StyledProjectGroup key={groupName}>
                            <h3>{groupName}</h3>
                            <SkillsContainer skills={groupProjects} group={true} filters={filters} toggleFilter={toggleFilter}/>
                        </StyledProjectGroup>
                    );
                })
            }
        </>
    );
}

export default SkillsContainer;