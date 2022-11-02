import styled from 'styled-components';

const StyledLabel = styled.div`
    position: absolute;
    left: ${props => props.x}px;
    color: white;
    transform: translate(-50%, -50%);
    text-shadow: 1px 1px 10px black;
    z-index: 2;
    white-space: nowrap;

    ${props => {
        return props.fromBottom
            ? `bottom: calc(${props.y}px);`
            : `top: calc(${props.y}px);`
    }};
`

export default StyledLabel;