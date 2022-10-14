import styled from 'styled-components';

const StyledShip = styled.div.attrs(props => ({
    style: {
        left: `${props.xPos}px`,
        top: `${props.yPos}px`,
        transform: `rotate(${props.rotation}deg)`
    }
}))`
    position: absolute;

    width: fit-content;
    border: 1px solid white;
    border-radius: 20px 20px 0px 0px;
    padding: 10px;
    color: transparent;

    transform-origin: center;
`;

export default StyledShip;