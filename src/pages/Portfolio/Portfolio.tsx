import { Dispatch, SetStateAction } from 'react';
import StyledPortfolio from './Portfolio.style';

import { projects } from '../../projects';

import Header from '../../components/Normal/Header/Header';
import ProjectContainer from '../../components/Normal/ProjectContainer/ProjectContainer';
import Container from '../../components/Normal/Container/Container';
import Button from '../../components/Normal/Button/Button';

const Portfolio = ({setGamified}: {setGamified: Dispatch<SetStateAction<boolean>>}) => {
    const onClickGamified = () => {
        setGamified(true);
    }

    return (
        <StyledPortfolio>
            <Header/>
            <Container>
                <Button label='Gamified' onClick={onClickGamified} color='#DEF'/>
                <ProjectContainer projects={projects}/>
            </Container>
        </StyledPortfolio>
    );
}

export default Portfolio;