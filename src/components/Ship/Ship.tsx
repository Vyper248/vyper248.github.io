import { useEffect, useState } from "react";

import StyledShip from "./Ship.style";

import { FRAME_SPEED } from "../../utils/constants";

import Particle from "../Particle/Particle";

const ROTATION_SPEED = 10*FRAME_SPEED/30;
const MOVE_SPEED = 0.2*FRAME_SPEED/30;
const THRUSTER_SPEED = 30;
const MAX_SPEED = 5;

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

const bottomOfShip = (rotation: number): [number, number] => {
    let positionAjust = (Math.random() * 8) - 4;
    let rotationRad = (rotation+90) * Math.PI / 180;
    let yAdjust = 20 * Math.sin(rotationRad) + 20;
    let xAdjust = 20 * Math.cos(rotationRad) + 15 + positionAjust;
    return [xAdjust, yAdjust];
}

const thrusterVelocity = (rotation: number): [number, number] => {
    let rotationAdjust = (Math.random() * 50) - 20;
    let rotationRad = (rotation+90+rotationAdjust) * Math.PI / 180;
    let yAdjust = MOVE_SPEED * Math.sin(rotationRad);
    let xAdjust = MOVE_SPEED * Math.cos(rotationRad);
    return [xAdjust, yAdjust];
}

const Ship = () => {
    const [xPos, setXPos] = useState(window.innerWidth/2);
    const [yPos, setYPos] = useState(window.innerHeight/2);
    const [xVel, setXVel] = useState(0);
    const [yVel, setYVel] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [keyPresses, setKeyPresses] = useState({} as KeyPresses);
    const [particles, setParticles] = useState([] as JSX.Element[]);

    const addParticle = () => {
        let key = Math.random()*200000;
        let [x, y] = bottomOfShip(rotation);
        let [xVel, yVel] = thrusterVelocity(rotation);
        let newArr = [...particles, <Particle key={key} ixPos={xPos+x} iyPos={yPos+y} xVel={xVel*THRUSTER_SPEED} yVel={yVel*THRUSTER_SPEED} rotation={rotation}/>];
        if (newArr.length > 50) newArr.shift();
        setParticles(newArr);
    }

    const everyFrame = () => {
        setXPos(xPos => {
            if (xPos < -20) return window.innerWidth+20 + xVel;
            if (xPos > window.innerWidth+20) return -20 + xVel;
            return xPos + xVel;
        });
        setYPos(yPos => {
            if (yPos < -20) return window.innerHeight+20 + yVel;
            if (yPos > window.innerHeight+20) return -20 + yVel;
            return yPos + yVel;
        });

        if (keyPresses['ArrowRight']) {
            setRotation(rotation => rotation+ROTATION_SPEED);
        }

        if (keyPresses['ArrowLeft']) {
            setRotation(rotation => rotation-ROTATION_SPEED);
        }

        if (keyPresses['ArrowUp']) {
            let [xAdjust, yAdjust] = direction(rotation, 'forward');
            addParticle();

            let adjusted = xVel > MAX_SPEED || xVel < -MAX_SPEED || yVel > MAX_SPEED || yVel < -MAX_SPEED;

            if (xVel > MAX_SPEED) setXVel(MAX_SPEED);
            if (xVel < -MAX_SPEED) setXVel(-MAX_SPEED);
            if (yVel > MAX_SPEED) setYVel(MAX_SPEED);
            if (yVel < -MAX_SPEED) setYVel(-MAX_SPEED);

            if (adjusted) return;

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
            e.preventDefault();
            setKeyPresses(keyPresses => {
                keyPresses[e.code] = true;
                return keyPresses;
            });
        }

        const keyUpListener = (e: KeyboardEvent) => {
            e.preventDefault();
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
        <>
            { particles }
            <StyledShip xPos={xPos} yPos={yPos} rotation={rotation}/>
        </>
    );
}

export default Ship;