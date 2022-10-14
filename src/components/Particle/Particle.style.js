import styled from 'styled-components';

const StyledParticle = styled.div.attrs(props => ({
    style: {
        left: `${props.xPos}px`,
        top: `${props.yPos}px`,
        transform: `rotate(${props.rotation}deg)`,
        opacity: `${props.opacity}`
    }
}))`
    position: absolute;

    width: 3px;
    height: 3px;
    background-color: red;
    border-radius: 50%;

    transform-origin: center;
`;

export default StyledParticle;