import styled from 'styled-components';

const StyledPerson = styled.div.attrs(props => {
    return {
        style: {
            transform: `translate(${props.x}px, -${props.y}px) scaleX(${props.flipped ? '-1' : '1'})`,
        }
    }
})`
    display: inline-block;
    position: absolute;
    z-index: 4;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    opacity: 0;
    animation: fadeIn 1s;
    animation-fill-mode: forwards;

    ${props => props.leaving ? 'animation: fadeOut 1s linear' : ''};

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`

export const StyledThoughts = styled.div`
    position: absolute;
    display: inline-block;
    bottom: calc(100% + 75px);
    left: 100%;
    width: max-content;
    max-width: 250px;
    white-space: pre-wrap;
    border: 1px solid black;
    background-color: white;
    border-radius: 20px;
    padding: 8px;

    & > span {
        display: inline-block;
        transform: scaleX(${props => props.flipped ? '-1' : '1'});
    }

    &::after {
        content: '';
        display: block;
        position: absolute;
        top: calc(100% - 7px);
        left: -15px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        border: 1px solid black;
    }

    &::before {
        content: '';
        display: block;
        position: absolute;
        top: calc(100% + 13px);
        left: -22px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: white;
        border: 1px solid black;
    }
`;

export const StyledHead = styled.div`
    position: absolute;
    top: -50px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
    border: 0.5px solid white;

    /* Large black area */
    &::after {
        content: '';
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: black;
        position: absolute;
        top: 0px;
        left: 30px;
        transform: rotate(45deg);
    }

    /* Small black area */
    &::before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%50%;
        background-color: black;
        position: absolute;
        top: 15px;
        left: 20px;
    }
`;

export const StyledBody = styled.div`
    position: absolute;
    top: -18px;
    left: 10px;
    width: 20px;
    height: 40px;
    background-color: white;
`;

export const StyledBackpack = styled.div`
    position: absolute;
    top: -10px;
    left: -5px;
    width: 14px;
    height: 30px;
    background-color: white;
    border-radius: 10px 10px 0px 0px;
`;

export const StyledLeftLeg = styled.div`
    position: absolute;
    top: 20px;
    left: 13px;
    width: 14px;
    height: 35px;
    background-color: white;
    transform-origin: top;

    ${props => {
        if (props.moving) {
            return `
                animation: move 0.3s linear;
                animation-iteration-count: infinite;
                animation-direction: alternate;
            `;
        }
    }}

    @keyframes move {
        from { transform: rotate(-20deg); }
        to { transform: rotate(20deg); }
    }

    /* Feet */
    &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 28px;
        left: 8px;
        width: 10px;
        height: 7px;
        border-radius: 0px 50% 0px 0px;
        background-color: white;
    }
`;

export const StyledRightLeg = styled(StyledLeftLeg)`
    ${props => props.moving ? 'animation-direction: alternate-reverse;' : ''}
`;

export const StyledArm = styled(StyledRightLeg)`
    top: -10px;
    left: 15px;
    width: 10px;
    background-color: #BBB;
    border-radius: 10px 10px 0px 0px;
    z-index: 4;

    &::after {
        display: none;
    }
`;

export default StyledPerson;