import styled from 'styled-components';

const StyledGameControls = styled.div`
    position: fixed;
    z-index: 5;
    bottom: 10px;
    left: 10px;
    display: grid;
    grid-template-columns: 50px 50px 50px;
    background-color: rgba(0,0,0,0.7);
    border-radius: 10px;
    height: ${props => props.closed ? '50px' : props.height};
    overflow: hidden;
    transition: height 0.3s;

    &:hover {
        cursor: pointer;
    }

    & > div {
        width: 100%;
        height: 50px;
        padding: 2px;
        display: flex;
        align-items: center;
        justify-content: start;

        span {
            font-size: 12px;
            font-weight: bold;
            color: white;
            /* text-shadow: 0px 0px 4px black; */
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
            background-color: rgba(255,255,255,0.8);
            color: black;
            /* opacity: 0.8; */

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

    & > div.span3 {
        grid-column: span 3;

        span {
            margin: auto;
        }
    }
`

export default StyledGameControls;