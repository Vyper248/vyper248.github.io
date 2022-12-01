import { memo, useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../../redux/hooks";

import { FRAME_SPEED } from "../../../utils/constants";
import { distanceFromAToB, normaliseVector } from "../Ship/Ship.utils";

import { StyledParticle } from "./Name.style";

const getActualPosition = (x:number, y:number) => {
    let actualX = 88 + (x * 5);
    let actualY = 128 - (y * 5);
    return [actualX, actualY];
}

const Particle = memo(({ x, y }: { x:number; y: number}) => {
    return (
        <StyledParticle x={x} y={y}></StyledParticle>
    )
})

const NameParticle = ({ x, y }: { x:number; y: number}) => {
    const shipX = useAppSelector(state => state.ship.xPos);
    const shipY = useAppSelector(state => state.ship.yPos);

    const [xPos, setXPos] = useState(x);
    const [yPos, setYPos] = useState(y);

    let distance = 35;
    const [distanceToCheck] = useState((Math.random()*10)+distance);

    let [actualX, actualY] = getActualPosition(x, y);

    useEffect(() => {
            let distanceToShip = distanceFromAToB([actualX, actualY], [shipX, shipY]);
            if (distanceToShip > 50) return;

            let xDiff = actualX - shipX;
            let yDiff = shipY - actualY;
            let normalised = normaliseVector(xDiff, yDiff, distanceToShip);

            let multiplier = (distanceToCheck - distanceToShip) / 5;
            if (multiplier < 0) multiplier = 0;

            setXPos(x + (normalised[0]*multiplier));
            setYPos(y + (normalised[1]*multiplier));
    }, [shipX, shipY]);

    return <Particle x={xPos} y={yPos}/>
}

export default NameParticle;