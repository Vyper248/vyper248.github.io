import styled from 'styled-components';

const StyledShip = styled.div.attrs(props => ({
    style: {
        transform: `translate(${props.xPos}px, ${props.yPos}px) rotate(${props.rotation}deg)`
    }
}))`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 30px;
    height: 40px;
    z-index: 4;
    transform-origin: center;

    & > img {
        position: relative;
        left: -10px;
        width: 48px;
        z-index: 5;
    }
`;

export default StyledShip;