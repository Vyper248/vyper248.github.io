import styled from 'styled-components';

const StyledName = styled.div`
    position: absolute;
    top: 150px;
    left: 100px;
`

export const StyledParticle = styled.div.attrs(props => {
    return {
        style: {
            transform: `translate(${props.x*5}px, ${-props.y*5}px)`
        }
    }
})`
    width: 2px;
    height: 2px;
    background-color: white;
    position: absolute;
    bottom: 0px;
    left: 0px;
`;

export default StyledName;