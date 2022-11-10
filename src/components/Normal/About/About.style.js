import styled from 'styled-components';

const StyledAbout = styled.div`
    display: flex;

    & #myImage {
        width: 150px;
        height: 200px;
        margin-right: 5px;
    }

    & #aboutMe {
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

export default StyledAbout;