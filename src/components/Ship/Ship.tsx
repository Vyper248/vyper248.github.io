import { useEffect, useState } from "react";

import StyledShip from "./Ship.style";

const FRAME_SPEED = 15;
const ROTATION_SPEED = 10*FRAME_SPEED/30;
const MOVE_SPEED = 0.1*FRAME_SPEED/30;

type KeyPresses = {
    [key: string]: boolean;
}

const direction = (rotation: number, type: 'forward' | 'backward'): [number, number] => {
    let rotationAdjust = type === 'forward' ? -90 : 90;
    let rotationRad = (rotation+rotationAdjust) * Math.PI / 180;
    let yAdjust = MOVE_SPEED * Math.sin(rotationRad);
    let xAdjust = MOVE_SPEED * Math.cos(rotationRad);
    return [xAdjust, yAdjust];
}

const Ship = () => {
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);
    const [xVel, setXVel] = useState(0);
    const [yVel, setYVel] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [keyPresses, setKeyPresses] = useState({} as KeyPresses);

    const everyFrame = () => {
        setXPos(xPos => xPos + xVel);
        setYPos(yPos => yPos + yVel);

        if (keyPresses['ArrowRight']) {
            setRotation(rotation => rotation+ROTATION_SPEED);
        }

        if (keyPresses['ArrowLeft']) {
            setRotation(rotation => rotation-ROTATION_SPEED);
        }

        if (keyPresses['ArrowUp']) {
            let [xAdjust, yAdjust] = direction(rotation, 'forward');
            setXVel(xVel => xVel + xAdjust);
            setYVel(yVel => yVel + yAdjust);
        }

        if (keyPresses['ArrowDown']) {
            let [xAdjust, yAdjust] = direction(rotation, 'backward');
            setXVel(xVel => xVel + xAdjust);
            setYVel(yVel => yVel + yAdjust);
        }
    }

    useEffect(() => {
        const keyDownListener = (e: KeyboardEvent) => {
            setKeyPresses(keyPresses => {
                keyPresses[e.code] = true;
                return keyPresses;
            });
        }

        const keyUpListener = (e: KeyboardEvent) => {
            setKeyPresses(keyPresses => {
                keyPresses[e.code] = false;
                return keyPresses;
            });
        }

        window.addEventListener('keydown', keyDownListener);
        window.addEventListener('keyup', keyUpListener);

        let interval = setInterval(everyFrame, FRAME_SPEED);

        return () => {
            window.removeEventListener('keydown', keyDownListener);
            window.removeEventListener('keyup', keyUpListener);
            clearInterval(interval);
        }
    }, [rotation, xVel, yVel]);

    return (
        <StyledShip xPos={xPos} yPos={yPos} rotation={rotation}>
            A
        </StyledShip>
    );
}

export default Ship;