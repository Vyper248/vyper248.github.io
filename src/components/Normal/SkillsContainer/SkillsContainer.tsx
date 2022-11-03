import StyledSkillsContainer from './SkillsContainer.style';

import { getGroups } from '../../../utils/utils';

import { SkillProps } from '../Skill/Skill';

import Skill from '../Skill/Skill';

type SkillsContainerProps = {
    skills: SkillProps[];
    group?: boolean;
}

const SkillsContainer = ({ skills, group=false }: SkillsContainerProps) => {
    if (group) {
        return (
            <StyledSkillsContainer>
                {
                    skills.map((project: SkillProps) => {
                        return <Skill key={project.name} {...project}/>
                    })
                }
            </StyledSkillsContainer>
        );
    }
    
    const groups = getGroups(skills) as {[key: string]: SkillProps[]};

    return (
        <>
            {
                Object.keys(groups).map((groupName: string) => {
                    let groupProjects = groups[groupName];
                    return (
                        <div key={groupName}>
                            <h3>{groupName}</h3>
                            <SkillsContainer skills={groupProjects} group={true}/>
                        </div>
                    );
                })
            }
        </>
    );

    return (
        <StyledSkillsContainer>
            {
                skills.map(skill => {
                    return <Skill key={skill.name} {...skill}/>
                })
            }
        </StyledSkillsContainer>
    );
}

export default SkillsContainer;