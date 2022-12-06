import styled from 'styled-components';

import { darkenHex } from '../../../utils/colors';

import { GROUND_WIDTH, GROUND_HEIGHT } from '../../../utils/constants';

const depth = 40;

export const StyledBlock = styled.div`
    perspective: 800px;
    /* perspective-origin: -200px -600px; */
    perspective-origin: -${props => props.x}px -600px;
    position: absolute;
    left: ${props => props.x}px;
    bottom: ${props => props.y}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    z-index: 2;

    & div.block {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
    }

    & div.side {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid ${props => darkenHex(props.groundColorFront)};
    }

    & div.front {
        background-color: ${props => props.groundColorFront};
    }

    & div.right {
        width: ${depth}px;
        background-color: ${props => props.groundColorFront};
        transform: rotateY(-90deg) translateZ(${depth/2}px) translateX(-${depth/2}px);
    }

    & div.top {
        height: ${depth}px;
        background-color: ${props => props.groundColor};
        transform: rotateX(90deg) translateZ(${depth/2}px) translateY(-${depth/2}px);
    }
`;

export const StyledBlockLabel = styled.label`
    display: inline-block;
    position: absolute;
    bottom: calc(100% + 45px);
    left: 20px;
    padding: 4px;
    border: 1px solid black;
    z-index: 4;
    background-color: #76512F;
    color: white;
    white-space: pre-wrap;

    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 100%;
        transform: translate(-50%, 0%);
        display: block;
        border: 1px solid black;
        border-top: none;
        width: 10px;
        height: 30px;
        background-color: #76512F;
    }
`;

const StyledTerrain = styled.div`
    position: relative;
    width: ${GROUND_WIDTH}px;
    height: ${GROUND_HEIGHT}px;
    background-color: ${props => props.skyColor};
    z-index: 1;
`

export default StyledTerrain;