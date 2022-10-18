import styled from 'styled-components';

import { GROUND_WIDTH, GROUND_HEIGHT } from '../../utils/constants';

export const StyledBlock = styled.div`
    position: absolute;
    left: ${props => props.x}px;
    top: ${props => props.y}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: gray;

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
        top: -19px;
        width: 22px;
        height: ${props => props.height}px;
        background-color: gray;
        transform: skewY(60deg);
        border-right: 1px solid darkgray;
    }
`;

const StyledTerrain = styled.div`
    width: ${GROUND_WIDTH}px;
    height: ${GROUND_HEIGHT}px;
    background-color: ${props => props.skyColor};
`

export default StyledTerrain;