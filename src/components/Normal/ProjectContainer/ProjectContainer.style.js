import styled from 'styled-components';

const StyledProjectContainer = styled.div`
    justify-content: start;
    display: flex;
    margin: auto;
    flex-wrap: wrap;
`

export const StyledProjectGroup = styled.div`
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
`;

export default StyledProjectContainer;