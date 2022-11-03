import styled from 'styled-components';

const StyledProject = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 150px;
    min-height: 100%;
    background-color: #DEF;
    padding: 10px;
    text-decoration: none;
    color: black;

    &:hover {
        cursor: pointer;
        background-color: #CDF;
    }
`

export default StyledProject;