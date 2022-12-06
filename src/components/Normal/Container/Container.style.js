import styled from 'styled-components';

const StyledContainer = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 0px 10px 20px 10px;

    @media screen and (max-width: 600px) {
        padding: 5px;
    }

    @media screen and (min-width: 2000px) {
        max-width: 1600px;
    }
`

export default StyledContainer;