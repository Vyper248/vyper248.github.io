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
    z-index: 2;
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

export const StyledHead = styled.div`
    position: absolute;
    top: -50px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
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
    transition: 0.1s;

    ${props => {
        if (props.moving) {
            return `
                animation: forward 0.3s linear;
                animation-iteration-count: infinite;
                animation-direction: alternate;

                @keyframes forward {
                    from { transform: rotate(-20deg); }
                    to { transform: rotate(20deg); }
                }
            `;
        }
    }}
`;

export const StyledRightLeg = styled.div`
    position: absolute;
    top: 20px;
    left: 13px;
    width: 14px;
    height: 35px;
    background-color: white;
    transform-origin: top;
    transition: 0.5s;

    ${props => {
        if (props.moving) {
            return `
                animation: forward 0.3s linear;
                animation-iteration-count: infinite;
                animation-direction: alternate-reverse;

                @keyframes forward {
                    from { transform: rotate(-20deg); }
                    to { transform: rotate(20deg); }
                }
            `;
        }
    }}
`;

export default StyledPerson;