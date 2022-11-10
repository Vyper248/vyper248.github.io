import styled from 'styled-components';

const StyledHeader = styled.div`
    width: 100%;
    background-color: var(--header-color);
    margin: 0px;

    & > div.container {
        max-width: 800px;
        margin: auto;
    }

    & div#links {
        padding: 10px;
        display: flex;

        & a {
            color: var(--text-color);
        }

        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        & .gap {
            flex-grow: 1;
        }

        & .scrollBtn {
            margin: 5px;
            font-size: 1.2em;
            font-variant: small-caps;

            :hover {
                cursor: pointer;
                color: var(--text-color-hover);
            }

            &::before {
                content: '<';
                opacity: 0.4;
            }

            &::after {
                content: '/>';
                opacity: 0.4;
            }
        }
    }

    h1 {
        padding: 10px;
        margin: 0px;
        text-align: center;
        font-variant: small-caps;
        font-size: 3em;
        font-family: var(--headingFont);
    }
`

export default StyledHeader;