import { Dispatch, SetStateAction } from 'react';
import StyledPortfolio from './Portfolio.style';

import { projects } from '../../projects';

import Header from '../../components/Normal/Header/Header';
import ProjectContainer from '../../components/Normal/ProjectContainer/ProjectContainer';
import Container from '../../components/Normal/Container/Container';

const Portfolio = ({setGamified}: {setGamified: Dispatch<SetStateAction<boolean>>}) => {
    const onClickGamified = () => {
        setGamified(true);
    }

    return (
        <StyledPortfolio>
            <Header/>
            <div onClick={onClickGamified}>Gamified</div>
            <Container>
                <ProjectContainer projects={projects}/>
            </Container>
        </StyledPortfolio>
    );
}

export default Portfolio;