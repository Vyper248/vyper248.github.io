import StyledSkillsContainer from './SkillsGroup.style';

import Skill, { SkillType } from '../Skill/Skill';

type SkillsContainerProps = {
    skills: SkillType[];
    heading: string;
    filters: string[];
    toggleFilter: (value: string) => () => void;
}

const SkillsContainer = ({ skills, heading, filters, toggleFilter }: SkillsContainerProps) => {
    return (
        <StyledSkillsContainer>
            <h3>{heading}</h3>
            <div className='group'>
                {
                    skills.map((skill: SkillType) => {
                        return <Skill key={skill.name} filters={filters} toggleFilter={toggleFilter} {...skill}/>
                    })
                }
            </div>
        </StyledSkillsContainer>
    );
}

export default SkillsContainer;