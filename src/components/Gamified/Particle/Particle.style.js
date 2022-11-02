import styled from 'styled-components';

const StyledParticle = styled.div.attrs(props => {
    let styleObj = {
        style: {
            left: `${props.xPos}px`,
            transform: `rotate(${props.rotation}deg)`,
            opacity: `${props.opacity}`
        }
    }

    if (props.fromBottom) styleObj.style.bottom = `${props.yPos}px`;
    else styleObj.style.top = `${props.yPos}px`;

    return styleObj;
})`
    position: absolute;
    z-index: 3;
    width: 3px;
    height: 3px;
    background-color: ${props => props.color ? props.color : 'orange'};
    border-radius: 50%;

    transform-origin: center;
`;

export default StyledParticle;