import StyledSkill from './Skill.style';

export type SkillType = {
    name: string;
    group: string;
}

type SkillProps = {
    filters: string[];
    toggleFilter: (value: string) => () => void;
}

const Skill = ({ name, filters, toggleFilter }: SkillType & SkillProps) => {
    return (
        <StyledSkill onClick={toggleFilter(name)} selected={filters.includes(name)}>
            { name }
        </StyledSkill>
    );
}

export default Skill;