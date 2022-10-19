import styled from 'styled-components';

const StyledLabel = styled.div`
    position: absolute;
    left: ${props => props.x}px;
    top: calc(${props => props.y}px + 30px);
    color: white;
    transform: translate(-50%, -50%);
    text-shadow: 1px 1px 10px black;
    z-index: 2;
`

export default StyledLabel;