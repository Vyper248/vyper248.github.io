import styled from 'styled-components';

const StyledProject = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: calc(20% - 10px);
    margin: 5px 5px 0px 0px;
    height: ${props => props.displayMode === 'minimal' ? '80px;' : '150px;'};
    min-height: 100%;
    background-color: var(--project-color);
    padding: 10px;
    text-decoration: none;
    color: var(--text-color);
    transition: 0.4s;

    &:hover {
        cursor: pointer;
        background-color: var(--project-color-hover);
    }

    @media screen and (max-width: 700px) {
        width: calc(25% - 10px);
    }

    @media screen and (max-width: 600px) {
        width: calc(33% - 10px);
    }

    @media screen and (max-width: 350px) {
        width: calc(50% - 10px);
    }
`

export const StyledLargeProject = styled.a`
    width: ${props => props.displayMode === 'minimal' ? '145px;' : '100%;'};
    border: 1px solid var(--project-color);
    color: var(--text-color);
    text-decoration: none;
    margin: 10px 5px;
    transition: 0.4s;
    background-color: var(--project-color);

    &:hover {
        background-color: var(--project-color-hover);
        border-color: var(--project-color-hover);

        .screenshot {
            border-bottom: 1px solid var(--project-color);
        }
    }

    & .screenshot {
        border-bottom: 1px solid var(--project-color);
        height: max-content;
        overflow: hidden;

        img {
            width: 100%;
            display: block;
        }
    }

    & .name {
        padding: 10px;
        margin: 5px 0px;
        min-height: ${props => props.displayMode === 'minimal' ? '60px;' : '0px'};
    }

    & .description {
        padding: 10px;
    }
`;

export const StyledMediumProject = styled(StyledLargeProject)`
    width: calc(50% - 10px);
    margin: 5px;

    & .name {
        min-height: 0px;
    }

    @media screen and (max-width: 500px) {
        width: 100%;
        transition: width 0s;
    }
`;

export default StyledProject;