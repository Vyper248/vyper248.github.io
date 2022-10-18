import styled from 'styled-components';

const StyledGamified = styled.div`
    position: relative;
    min-width: 100vw;
    width: ${props => props.width}px;
    min-height: 100vh;
    height: ${props => props.height}px;
    overflow: hidden;
    background-color: black;
`

export default StyledGamified;