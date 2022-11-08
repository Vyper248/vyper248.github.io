import styled from 'styled-components';

const StyledProject = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 150px;
    min-height: 100%;
    background-color: var(--project-color);
    padding: 10px;
    text-decoration: none;
    color: black;

    &:hover {
        cursor: pointer;
        background-color: var(--project-color-hover);
    }
`

export const StyledLargeProject = styled.a`
    grid-column: span 5;
    border: 1px solid var(--border-color);
    color: black;
    text-decoration: none;
    margin: 10px 0px;
    transition: 0.4s;

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
    grid-column: span 2;
`;

export default StyledProject;