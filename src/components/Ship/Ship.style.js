import styled from 'styled-components';

const StyledShip = styled.div.attrs(props => ({
    style: {
        left: `${props.xPos}px`,
        top: `${props.yPos}px`,
        transform: `rotate(${props.rotation}deg)`
    }
}))`
    position: absolute;

    width: 30px;
    height: 40px;
    border: 1px solid white;
    border-radius: 20px 20px 0px 0px;
    background-color: black;
    z-index: 2;
    transform-origin: center;
`;

export default StyledShip;