import styled from 'styled-components';

const StyledHeader = styled.div`
    width: 100%;
    background-color: #DEF;
    margin: 0px;

    & > div.container {
        max-width: 800px;
        margin: auto;
    }

    & div#links {
        padding: 10px;
        display: flex;

        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        & .gap {
            flex-grow: 1;
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