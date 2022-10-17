import styled from 'styled-components';

export const StyledStar = styled.span.attrs((props) => {
    let size = Math.random()*3;
    let colorVal = (Math.random()*100)+155;
    return {
        style: {
            left: props.x+'px',
            top: props.y+'px',
            width: size+'px',
            height: size+'px',
            backgroundColor: `rgb(${colorVal},${colorVal},${colorVal})`
        }
    }
})`
    position: absolute;
    display: inline-block;
`;