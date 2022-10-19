import styled from 'styled-components';

const StyledPerson = styled.div.attrs(props => {
    return {
        style: {
            // left: props.x+'px',
            // bottom: props.y+'px',
            transform: `translate(${props.x}px, -${props.y}px)`,
        }
    }
})`
    display: inline-block;
    position: absolute;
    z-index: 2;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    box-shadow: inset -8px -8px 10px gray;
    opacity: 0;
    animation: fadeIn 1s;
    animation-fill-mode: forwards;

    ${props => props.leaving ? 'animation: fadeOut 1s linear' : ''};

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`

export default StyledPerson;