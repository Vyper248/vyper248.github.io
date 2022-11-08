import styled from 'styled-components';

const StyledProject = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: calc(20% - 10px);
    margin: 5px;
    height: 150px;
    min-height: 100%;
    background-color: var(--project-color);
    /* border: 1px solid var(--border-color); */
    padding: 10px;
    text-decoration: none;
    color: black;
    transition: width 0s, background-color 0.4s;

    &:hover {
        cursor: pointer;
        background-color: var(--project-color-hover);
    }

    @media screen and (max-width: 700px) {
        width: calc(25% - 10px);
        transition: width 0s;
    }

    @media screen and (max-width: 600px) {
        width: calc(33% - 10px);
        transition: width 0s;
    }

    @media screen and (max-width: 350px) {
        width: calc(50% - 10px);
        transition: width 0s;
    }
`

export const StyledLargeProject = styled.a`
    width: 100%;
    border: 1px solid var(--border-color);
    color: black;
    text-decoration: none;
    margin: 10px 5px;
    transition: width 0s, background-color 0.4s;

    &:hover {
        background-color: var(--project-color-hover);
        border-color: var(--project-color-hover);

        .screenshot {
            border-bottom: 1px solid var(--project-color-hover);
        }
    }

    & .screenshot {
        border-bottom: 1px solid var(--border-color);
        height: max-content;

        img {
            width: 100%;
            display: block;
        }
    }

    & .name {
        padding: 10px;
        margin: 5px 0px;
    }

    & .description {
        padding: 10px;
    }
`;

export const StyledMediumProject = styled(StyledLargeProject)`
    width: calc(50% - 10px);
    margin: 5px;

    @media screen and (max-width: 500px) {
        width: 100%;
        transition: width 0s;
    }
`;

export default StyledProject;