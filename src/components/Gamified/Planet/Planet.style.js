import styled from 'styled-components';

import { darkenHex } from '../../../utils/colors';

//random number between a and b
const r = (a, b) => {
    return Math.floor((Math.random() * (b-a)) + a);
}

const getClipPath = () => {
    let x1 = r(5,20);
    let y1 = r(25,40);

    let x2 = r(x1, 60);
    let y2 = r(5,y1);

    let x3 = r(x2, 80);
    let y3 = r(5,20);

    let x4 = r(60,90);
    let y4 = r(y3, y3+20);

    let x5 = r(70,80);
    let y5 = r(y4, y4+20);

    let x6 = r(70,100);
    let y6 = r(y5, y5+20);

    let x7 = r(40,x6-10);
    let y7 = r(80, 100);

    let x8 = r(20,x7-10);
    let y8 = r(70, 90);

    let x9 = r(10, 30);
    let y9 = r(50, y8);

    return `
        ${x1}% ${y1}%,
        ${x2}% ${y2}%,
        ${x3}% ${y3}%,
        ${x4}% ${y4}%,
        ${x5}% ${y5}%,
        ${x6}% ${y6}%,
        ${x7}% ${y7}%,
        ${x8}% ${y8}%,
        ${x9}% ${y9}%
    `;
}

const StyledPlanet = styled.span.attrs(props => {
    return {
        clipPathA: `polygon(${getClipPath()})`,
        clipPathB: `polygon(${getClipPath()})`,
        style: {
            left: props.x+'px',
            top: props.y+'px',
            width: props.size+'px',
            height: props.size+'px',
            backgroundColor: props.color,
            boxShadow: `inset -${props.size/10}px -${props.size/10}px 10px ${darkenHex(props.color)}`
        }
    }
})`
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    overflow: hidden;

    /* Left Shape */
    &:after {
        content: '';
        position: absolute;
        top: -10%;
        left: ${() => r(-10,15)}%;
        display: inline-block;
        width: 35%;
        height: ${() => r(80,100)}%;
        background-color: ${props => props.colorLeft};
        clip-path: ${props => props.clipPathA};
    }

    /* Right Shape */
    &:before {
        content: '';
        position: absolute;
        top: ${() => r(10,40)}%;
        left: 50%;
        display: inline-block;
        width: 30%;
        height: 30%;
        background-color: ${props => props.colorRight};
        clip-path: ${props => props.clipPathB};
    }

    /* Label */
    & > div {
        font-size: 2em;
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        text-shadow: 1px 1px 10px black;
    }
`;

export default StyledPlanet;