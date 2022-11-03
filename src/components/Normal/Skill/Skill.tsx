import StyledSkill from './Skill.style';

export type SkillProps = {
    name: string;
    group: string;   
}

const Skill = ({ name }: SkillProps) => {
    return (
        <StyledSkill>
            { name }
        </StyledSkill>
    );
}

export default Skill;