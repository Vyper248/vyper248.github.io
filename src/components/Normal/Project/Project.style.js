import styled from 'styled-components';

const StyledProject = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 150px;
    height: 150px;
    background-color: #DEF;
    margin: 5px;
    padding: 10px;
    text-decoration: none;
    color: black;

    &:hover {
        cursor: pointer;
        background-color: #CDF;
    }
`

export default StyledProject;