import styled from 'styled-components';

const StyledButton = styled.div`
    background-color: ${props => props.color};
    color: ${props => props.textColor ? props.textColor : 'black'};
    width: ${props => props.width ? props.width : '150px'};
    border-radius: 5px;
    padding: 5px;
    margin: ${props => props.margin ? props.margin : '5px'};
    display: inline-block;
    text-align: center;
    ${props => props.selected ? 'filter: brightness(75%);' : ''}

    ${props => props.selected ? `
        &:before {
            content: 'display = ';
            opacity: 0.4;
            font-family: monospaced;
            font-variant: small-caps;
        }
    ` : ''}

    &:hover {
        cursor: pointer;
        filter: brightness(75%);
    }
`

export default StyledButton;