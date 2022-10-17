import StyledGamified from "./Gamified.style";

import Ship from "../components/Ship/Ship";
import Stars from "../components/Stars/Stars";

const Gamified = () => {

    // const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     ctx.fillStyle = '#000000';
    //     ctx.beginPath();
    //     ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
    //     ctx.fill();
    // }

    return (
        <StyledGamified>
            <Stars width={window.innerWidth} height={window.innerHeight} qty={100}/>
            <Ship/>
            {/* <Canvas draw={draw}/> */}
        </StyledGamified>
    );
}

export default Gamified;