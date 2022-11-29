import StyledSkills from './Skills.style';

import { getGroups } from '../../../utils/utils';

import SkillsGroup from '../SkillsGroup/SkillsGroup';
import Heading from '../Heading/Heading';
import type { SkillType } from '../Skill/Skill';

type SkillsProps = {
    skills: SkillType[];
    filters: string[];
    toggleFilter: (value: string) => () => void;
}

const Skills = ({ skills, filters, toggleFilter }: SkillsProps) => {
    const groups = getGroups(skills) as {[key: string]: SkillType[]};

    return (
        <StyledSkills>
            <Heading heading='Skills'/>
            <div className='groupContent'>
                {
                    Object.keys(groups).map((groupName: string) => {
                        let groupProjects = groups[groupName];
                        return (
                            <div key={groupName} className='group'>
                                <h3>{groupName}</h3>
                                <SkillsGroup skills={groupProjects} filters={filters} toggleFilter={toggleFilter}/>
                            </div>
                        );
                    })
                }
            </div>
        </StyledSkills>
    );
}

export default Skills;