import styled from 'styled-components';
import { GROUND_WIDTH, GROUND_HEIGHT } from "../../utils/constants";

const StyledPlatformer = styled.div`
    position: relative;
    width: ${GROUND_WIDTH}px;
    height: ${GROUND_HEIGHT}px;
    z-index: 1;
    scroll-behavior: auto;
`

export default StyledPlatformer;