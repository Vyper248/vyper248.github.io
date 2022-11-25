import React, { Dispatch, SetStateAction, useEffect } from 'react';
import StyledPortfolio from './Portfolio.style';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setDisplayMode, setStyle } from '../../redux/setupSlice';
import { updateStyle } from '../../utils/colors';

import { projects } from '../../projects';
import { skills } from '../../skills';

import Header from '../../components/Normal/Header/Header';
import ProjectContainer from '../../components/Normal/ProjectContainer/ProjectContainer';
import SkillsContainer from '../../components/Normal/SkillsContainer/SkillsContainer';
import Container from '../../components/Normal/Container/Container';
import Button from '../../components/Normal/Button/Button';
import Heading from '../../components/Normal/Heading/Heading';
import InputCheckbox from '../../components/Normal/InputCheckbox/InputCheckbox';
import About from '../../components/Normal/About/About';

const Portfolio = ({setGamified}: {setGamified: Dispatch<SetStateAction<boolean>>}) => {
    const style = useAppSelector(state => state.setup.style);
    const displayMode = useAppSelector(state => state.setup.displayMode);
    const dispatch = useAppDispatch();

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

    return (
        <StyledPortfolio>
            <Header/>
            <Container>
                <Button label='Gamified' onClick={onClickGamified} color='#F77'/>
                <Button label={displayMode === 'minimal' ? 'Minified' : 'Normal'} onClick={onClickDisplayMode} color='#DEF' selected={true}/>
                <InputCheckbox label='Dark Mode' checked={style === 'dark'} onChange={onChangeStyle}/>

                <Heading heading='About'/>
                <About/>
                <Heading heading='Projects'/>
                <ProjectContainer projects={projects}/>
                <Heading heading='Skills'/>
                <SkillsContainer skills={skills}/>
            </Container>
        </StyledPortfolio>
    );
}

export default Portfolio;