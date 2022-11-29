import styled from 'styled-components';

const StyledCollapsibleContent = styled.div`
    ${props => props.height > 0 ? `height: ${props.height}px;` : ''};
    overflow: hidden;
    transition: 0.4s;

    ${props => props.open === false ? 'height: 0px;' : ''}
`

export default StyledCollapsibleContent;