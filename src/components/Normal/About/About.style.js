import styled from 'styled-components';

const StyledAbout = styled.div`
    display: flex;
    justify-content: center;

    & #myImage {
        width: 150px;
        height: 200px;
        margin-right: 10px;
        margin-top: 10px;
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
            padding-bottom: 0px;
            padding-top: 0px;
        }

        & .cm-editor {
            background-color: transparent !important;
        }
    }

    /* Add top padding to first code editor, but not second */
    & #aboutMe > .cm-theme-dark:first-child .cm-content {
        padding-top: 5px;
    }

    @media screen and (min-width: 2000px) {
        & #aboutMe {
            max-width: 700px;
        }
    }
`

export default StyledAbout;