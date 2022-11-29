import styled from 'styled-components';

const StyledHeading = styled.h2`
    position: relative;
    margin: 20px 0px;
    text-align: center;
    font-variant: small-caps;
    font-size: 2em;
    font-family: var(--headingFont);
    
    &::before {
        content: '< ';
        opacity: 0.4;
    }

    &::after {
        content: ' />';
        opacity: 0.4;
    }

    & .faded {
        opacity: 0.4;
        font-variant: normal;
    }

    & .collapsed {
        cursor: pointer;
    }
`

export default StyledHeading;