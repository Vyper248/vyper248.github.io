import styled from 'styled-components';

const StyledPortfolio = styled.div`
    max-height: 100vh;
    overflow: scroll;
    scroll-behavior: smooth;

    & #filters {
        flex-grow: 1;
        max-width: calc(100% - 150px);
        white-space: normal;

        & .cm-line {
            max-width: 100%;
            white-space: normal;
        }

        & .cm-content {
            max-width: 100%;
        }

        & .cm-editor {
            background-color: transparent !important;
        }
    }
`

export default StyledPortfolio;