import styled from 'styled-components';

const StyledProjects = styled.div`

    & .groupContent {
        ${props => props.height > 0 ? `height: ${props.height}px;` : ''};
        overflow: hidden;
        transition: 0.4s;

        ${props => props.open === false ? 'height: 0px;' : ''}
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