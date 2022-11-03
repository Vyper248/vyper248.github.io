import { Dispatch, SetStateAction } from 'react';
import StyledPortfolio from './Portfolio.style';

import { projects } from '../../projects';
import { skills } from '../../skills';

import Header from '../../components/Normal/Header/Header';
import ProjectContainer from '../../components/Normal/ProjectContainer/ProjectContainer';
import SkillsContainer from '../../components/Normal/SkillsContainer/SkillsContainer';
import Container from '../../components/Normal/Container/Container';
import Button from '../../components/Normal/Button/Button';
import Heading from '../../components/Normal/Heading/Heading';

const Portfolio = ({setGamified}: {setGamified: Dispatch<SetStateAction<boolean>>}) => {
    const onClickGamified = () => {
        setGamified(true);
    }

    return (
        <StyledPortfolio>
            <Header/>
            <Container>
                <Button label='Gamified' onClick={onClickGamified} color='#F77'/>
                <Heading heading='Projects'/>
                <ProjectContainer projects={projects}/>
                <Heading heading='Skills'/>
                <SkillsContainer skills={skills}/>
            </Container>
        </StyledPortfolio>
    );
}

export default Portfolio;