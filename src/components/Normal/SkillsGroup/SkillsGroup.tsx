import StyledSkillsContainer from './SkillsGroup.style';

import Skill, { SkillType } from '../Skill/Skill';

type SkillsContainerProps = {
    skills: SkillType[];
    filters: string[];
    toggleFilter: (value: string) => () => void;
}

const SkillsContainer = ({ skills, filters, toggleFilter }: SkillsContainerProps) => {
    return (
        <StyledSkillsContainer>
            {
                skills.map((skill: SkillType) => {
                    return <Skill key={skill.name} filters={filters} toggleFilter={toggleFilter} {...skill}/>
                })
            }
        </StyledSkillsContainer>
    );
}

export default SkillsContainer;