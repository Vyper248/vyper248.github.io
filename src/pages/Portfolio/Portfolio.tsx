import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import StyledPortfolio from './Portfolio.style';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setDisplayMode, setStyle } from '../../redux/setupSlice';
import { updateStyle } from '../../utils/colors';

import { projects } from '../../projects';
import { skills } from '../../skills';

import Header from '../../components/Normal/Header/Header';
import Skills from '../../components/Normal/Skills/Skills';
import Projects from '../../components/Normal/Projects/Projects';
import Container from '../../components/Normal/Container/Container';
import Button from '../../components/Normal/Button/Button';
import InputCheckbox from '../../components/Normal/InputCheckbox/InputCheckbox';
import About from '../../components/Normal/About/About';

import { ProjectProps as Project } from '../../components/Normal/Project/Project';
import { SkillType as Skill } from '../../components/Normal/Skill/Skill';

const getExtraSkills = (projects: Project[], skills: Skill[]) => {
    let extraSkills = new Set();

    //get all skills
    projects.forEach(project => {
        let projectSkills = project.skills;
        projectSkills.forEach(skill => extraSkills.add(skill));
    });

    //remove skills already shown
    skills.forEach(skill => {
        extraSkills.delete(skill.name);
    });

    return Array.from(extraSkills).map(skill => ({name: skill, group: 'Older Skills'})) as Skill[];
}

const Portfolio = ({setGamified}: {setGamified: Dispatch<SetStateAction<boolean>>}) => {
    const dispatch = useAppDispatch();
    const style = useAppSelector(state => state.setup.style);
    const displayMode = useAppSelector(state => state.setup.displayMode);
    
    const [filters, setFilters] = useState(new Set());

    const extraSkills = getExtraSkills(projects, skills);

    useEffect(() => {
        updateStyle(style);
    }, [style]);

    const onClickGamified = () => {
        setGamified(true);
    }

    const onClickDisplayMode = () => {
        if (displayMode === 'normal') {
            dispatch(setDisplayMode('minimal'));
        } else {
            dispatch(setDisplayMode('normal'));
        }
    }

    const onChangeStyle = (value: boolean) => {
        let newStyle: 'dark' | 'light' = value ? 'dark' : 'light';
        dispatch(setStyle(newStyle));
    }

    const toggleFilter = (value: string) => () => {
        if (filters.has(value)) {
            let newSet = new Set(filters);
            newSet.delete(value);
            setFilters(newSet);
        } else {
            let newSet = new Set(filters);
            newSet.add(value);
            setFilters(newSet);
        }
    }

    let filterArr = Array.from(filters) as string[];

    return (
        <StyledPortfolio>
            <Header/>
            <Container>
                <Button label='Gamified' onClick={onClickGamified} color='#F77'/>
                <Button label={displayMode === 'minimal' ? 'Minified' : 'Normal'} onClick={onClickDisplayMode} color='#DEF' selected={true}/>
                <InputCheckbox label='Dark Mode' checked={style === 'dark'} onChange={onChangeStyle}/>

                <About/>
                <Skills skills={[...skills, ...extraSkills]} filters={filterArr} toggleFilter={toggleFilter}/>
                <Projects projects={projects} filters={filterArr}/>
            </Container>
        </StyledPortfolio>
    );
}

export default Portfolio;