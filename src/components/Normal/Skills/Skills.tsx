import { useState } from 'react';

import StyledSkills from './Skills.style';

import { getGroups } from '../../../utils/utils';

import SkillsGroup from '../SkillsGroup/SkillsGroup';
import Heading from '../Heading/Heading';
import CollapsibleContent from '../CollapsibleContent/CollapsibleContent';
import type { SkillType } from '../Skill/Skill';

type SkillsProps = {
    skills: SkillType[];
    filters: string[];
    toggleFilter: (value: string) => () => void;
}

const Skills = ({ skills, filters, toggleFilter }: SkillsProps) => {
    const [open, setOpen] = useState(true);

    const groups = getGroups(skills) as {[key: string]: SkillType[]};

    return (
        <StyledSkills>
            <Heading heading='Skills' collapsible={true} collapsed={!open} onClick={() => setOpen(!open)}/>
            <CollapsibleContent open={open}>
                {
                    Object.keys(groups).map((groupName: string) => {
                        let groupProjects = groups[groupName];
                        return <SkillsGroup skills={groupProjects} heading={groupName} filters={filters} toggleFilter={toggleFilter}/>;
                    })
                }
            </CollapsibleContent>
        </StyledSkills>
    );
}

export default Skills;