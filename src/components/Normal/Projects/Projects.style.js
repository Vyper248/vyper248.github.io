import styled from 'styled-components';

const StyledProjects = styled.div`

    & .groupContent {
        max-height: 1000px;
        overflow: hidden;
        transition: 0.5s;
    }

    & .group {
        & > h3 {
            margin: 20px 0px 5px 0px;
            font-variant: small-caps;

            &::before {
                content: 'if (type === ';
                opacity: 0.4;
            }

            &::after {
                content: ')';
                opacity: 0.4;
            }
        }
    }
`

export default StyledProjects;