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
    border: 1px solid white;
    border-radius: 20px 20px 0px 0px;
    background-color: white;
    z-index: 4;
    transform-origin: center;

    &::after {
        content: '';
        position: absolute;
        display: inline-block;
        width: 30px;
        height: 0px;
        background-color: transparent;
        border-left: 15px solid transparent;
        border-bottom: 15px solid white;
        border-right: 15px solid transparent;
        top: 25px;
        left: -16px;
    }

    &::before {
        content: '';
        position: absolute;
        display: inline-block;
        width: 5px;
        height: 0px;
        background-color: transparent;
        border-left: 10px solid transparent;
        border-top: 10px solid white;
        border-right: 10px solid transparent;
        top: 35px;
        left: 0px;
    }
`;

export default StyledShip;