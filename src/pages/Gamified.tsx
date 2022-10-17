import StyledGamified from "./Gamified.style";

import Ship from "../components/Ship/Ship";
import Stars from "../components/Stars/Stars";
import Planet from "../components/Planet/Planet";

const Gamified = () => {

    // const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     ctx.fillStyle = '#000000';
    //     ctx.beginPath();
    //     ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
    //     ctx.fill();
    // }

    const planets = [
        {
            label: 'Projects',
            x: 245,
            y: 543,
            size: 300,
            color: '#0000FF',
            colorLeft: 'green',
            colorRight: 'green'
        },
        {
            label: 'Skills',
            x: 845,
            y: 200,
            size: 200,
            color: '#Fa8362',
            colorLeft: '#E97251',
            colorRight: '#E97251'
        }
    ];

    return (
        <StyledGamified>
            <Stars width={window.innerWidth} height={window.innerHeight} qty={100}/>
            {
                planets.map((planet) => {
                    let { label, ...rest } = planet;
                    return <Planet key={label} label={label} {...rest}/>
                })
            }
            <Ship/>
            {/* <Canvas draw={draw}/> */}
        </StyledGamified>
    );
}

export default Gamified;