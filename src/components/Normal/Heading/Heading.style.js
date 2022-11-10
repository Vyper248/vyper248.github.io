import styled from 'styled-components';

const StyledHeading = styled.h2`
    position: relative;
    margin: 20px 0px;
    text-align: center;
    font-variant: small-caps;
    font-size: 2em;
    font-family: var(--headingFont);

    /* background-color: var(--project-color); */

    /* &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        height: calc(100% - 2px);
        width: 100px;
        border-left: 2px solid var(--text-color);
        border-top: 2px solid var(--text-color);
    }

    &::after {
        content: '';
        position: absolute;
        right: 0px;
        bottom: 0px;
        height: calc(100% - 2px);
        width: 100px;
        border-right: 2px solid var(--text-color);
        border-bottom: 2px solid var(--text-color);
    } */

    &::before {
        content: '< ';
        opacity: 0.4;
    }

    &::after {
        content: ' />';
        opacity: 0.4;
    }
`

export default StyledHeading;