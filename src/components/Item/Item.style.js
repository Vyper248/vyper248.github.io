import styled from 'styled-components';

const StyledItem = styled.div`
    position: absolute;
    left: ${props => props.x + (props.offsetX || 0)}px;
    bottom: ${props => props.y + props.offset}px;
    z-index: 1;

    & > img {
        width: ${props => props.width}px;
    }
`

export default StyledItem;