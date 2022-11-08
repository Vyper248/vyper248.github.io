import styled from 'styled-components';

const StyledInputCheckbox = styled.div`
    display: inline-flex;
    align-items: center;
    vertical-align: bottom;
    float: right;
    
    & .container {
        position: relative;
        display: inline-block;
        border: 1px solid var(--border-color);
        height: 29px;
        width: 45px;
        margin: 5px;
        vertical-align: bottom;
        border-radius: 20px;
    
        :hover {
            cursor: pointer;
        }
    }

    & .circle {
        position: relative;
        top: 1px;
        left: 1px;
        left: ${props => props.checked ? 'calc(100% - 26px)' : '1px'};
        width: 25px;
        height: 25px;
        border: 1px solid ${props => props.checked ? 'var(--project-color)' : 'var(--border-color)'};;
        border-radius: 50%;
        transition: 0.4s;
        background-color: ${props => props.checked ? '#7F7' : 'var(--border-color)'};
    }
`

export default StyledInputCheckbox;