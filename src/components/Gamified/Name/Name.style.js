import styled from 'styled-components';

const StyledName = styled.div`
    position: relative;
    top: 150px;
    left: 100px;
`

export const StyledParticle = styled.div`
    width: 2px;
    height: 2px;
    background-color: white;
    position: absolute;
    bottom: ${props => props.y*5}px;
    left: ${props => props.x*5}px;
`;

export default StyledName;