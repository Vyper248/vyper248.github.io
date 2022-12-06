import styled from 'styled-components';

const StyledProjectContainer = styled.div`
    & .faded {
        opacity: 0.4;
        font-variant: normal;
    }

    & .toggle {
        font-variant: small-caps;
        
        :hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }

    & > h3 {
            margin: 20px 0px 5px 0px;
            /* font-variant: small-caps; */

            &::before {
                content: 'if (type === ';
                opacity: 0.4;
            }

            &::after {
                content: ')';
                opacity: 0.4;
            }
        }

    & div.group {
        justify-content: start;
        display: flex;
        margin: auto;
        flex-wrap: wrap;
    }
`

export default StyledProjectContainer;