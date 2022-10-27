import styled from 'styled-components';

const StyledGameControls = styled.div`
    position: fixed;
    z-index: 5;
    bottom: 10px;
    left: 10px;
    display: grid;
    grid-template-columns: 50px 50px 50px;

    & > div {
        width: 100%;
        height: 50px;
        padding: 2px;
        display: flex;
        align-items: center;
        justify-content: start;

        span {
            font-size: 12px;
        }

        div {
            position: relative;
            width: 100%;
            height: 100%;
            border: 1px solid black;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            opacity: 0.8;

            span {
                position: absolute;
                bottom: 2px;
                font-size: 0.7em;
            }
        }
    }

    & > div.span2 {
        grid-column: span 2;
    }
`

export default StyledGameControls;