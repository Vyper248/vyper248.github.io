import styled from 'styled-components';

const StyledPerson = styled.div.attrs(props => {
    return {
        style: {
            left: props.x+'px',
            top: props.y+'px'
        }
    }
})`
    display: inline-block;
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    box-shadow: inset -8px -8px 10px gray;
`

export default StyledPerson;