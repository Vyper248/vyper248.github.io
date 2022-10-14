import { useEffect, useState } from "react";
import StyledParticle from "./Particle.style";

import { FRAME_SPEED } from "../../utils/constants";

type ParticleProps = {
    ixPos: number;
    iyPos: number;
    xVel: number;
    yVel: number;
    rotation: number;
}

const Particle = ({ixPos, iyPos, xVel, yVel, rotation}: ParticleProps) => {
    const [xPos, setXPos] = useState(ixPos);
    const [yPos, setYPos] = useState(iyPos);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        let interval = setInterval(() => {
            setXPos(xPos => xPos + xVel);
            setYPos(yPos => yPos + yVel);
    
            setOpacity(opacity => {
                let newOpacity = opacity - 0.02;
                if (newOpacity < 0) {
                    newOpacity = 0;
                    clearInterval(interval);
                }
                return newOpacity;
            });
        }, FRAME_SPEED);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <StyledParticle xPos={xPos} yPos={yPos} rotation={rotation} opacity={opacity}></StyledParticle>
    );
}

export default Particle;