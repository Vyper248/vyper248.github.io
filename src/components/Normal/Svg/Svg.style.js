import styled from 'styled-components';

const StyledSvg = styled.div`
    width: 32px;
    margin-left: 5px;
    background-color: ${props => props.color ? props.color : 'var(--text-color)'};
    mask: url(${props => props.src}) no-repeat center;

    & > img {
        width: 100%;
        opacity: 0;
    }

    &:hover {
        background-color: ${props => props.color ? props.color : 'var(--text-color-hover)'};
    }
`

export default StyledSvg;