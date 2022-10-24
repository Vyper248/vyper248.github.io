import styled from 'styled-components';

import { darkenHex } from '../../utils/colors';

import { GROUND_WIDTH, GROUND_HEIGHT } from '../../utils/constants';

export const StyledBlock = styled.div`
    position: absolute;
    left: ${props => props.x}px;
    bottom: ${props => props.y}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: ${props => props.groundColorFront};

    &::after {
        content: '';
        position: absolute;
        left: -12px;
        top: -40px;
        width: ${props => props.width}px;
        height: 40px;
        background-color: ${props => props.groundColor};
        transform: skewX(30deg);
    }

    &::before {
        content: '';
        position: absolute;
        left: -23px;
        top: -20px;
        width: 22px;
        height: ${props => props.height}px;
        background-color: ${props => props.groundColorFront};
        transform: skewY(60deg);
        border-right: 1px solid ${props => darkenHex(props.groundColorFront)};
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