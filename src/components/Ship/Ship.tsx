import { useEffect, useState, createRef, RefObject } from "react";

import StyledShip from "./Ship.style";

import { FRAME_SPEED, SPACE_WIDTH, SPACE_HEIGHT } from "../../utils/constants";
import { Planet } from "../../pages/Gamified/Gamified";

import Particle from "../Particle/Particle";
import Label from "../Label/Label";

const ROTATION_SPEED = 10*FRAME_SPEED/30;
const MOVE_SPEED = 0.2*FRAME_SPEED/30;
const THRUSTER_SPEED = 30;
const MAX_SPEED = 5;
const ALLOWABLE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];

type KeyPresses = {
    [key: string]: boolean;
}

export type ParticleObj = {
    particle: JSX.Element;
    ref: RefObject<HTMLDivElement>;
}

export type ShipPos = {
    x: number;
    y: number;
    r: number;
}

type ShipProps = {
    planets: Planet[];
    startingShipPos: ShipPos;
}

const direction = (rotation: number, type: 'forward' | 'backward'): [number, number] => {
    let rotationAdjust = type === 'forward' ? -90 : 90;
    let rotationRad = (rotation+rotationAdjust) * Math.PI / 180;
    let yAdjust = MOVE_SPEED * Math.sin(rotationRad);
    let xAdjust = MOVE_SPEED * Math.cos(rotationRad);
    return [xAdjust, yAdjust];
}

const bottomOfShip = (rotation: number): [number, number] => {
    let positionAdjust = (Math.random() * 8) - 4;
    let rotationRad = (rotation+90) * Math.PI / 180;
    let yAdjust = 30 * Math.sin(rotationRad) + 19 + positionAdjust;
    let xAdjust = 30 * Math.cos(rotationRad) + 14 + positionAdjust;
    return [xAdjust, yAdjust];
}

const thrusterVelocity = (rotation: number): [number, number] => {
    let rotationAdjust = (Math.random() * 50) - 20;
    let rotationRad = (rotation+90+rotationAdjust) * Math.PI / 180;
    let yAdjust = MOVE_SPEED * Math.sin(rotationRad);
    let xAdjust = MOVE_SPEED * Math.cos(rotationRad);
    return [xAdjust, yAdjust];
}

const distanceFromAToB = (a: [number, number], b: [number, number]): number => {
    let xDiff = b[0] - a[0];
    let yDiff = b[1] - a[1];
    let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    return distance;
}

const Ship = ({planets, startingShipPos}: ShipProps) => {
    const [xPos, setXPos] = useState(window.innerWidth/2);
    const [yPos, setYPos] = useState(window.innerHeight/2);
    const [xVel, setXVel] = useState(0);
    const [yVel, setYVel] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [keyPresses, setKeyPresses] = useState({} as KeyPresses);
    const [particleArr, setParticleArr] = useState([] as ParticleObj[]);
    const [closeTo, setCloseTo] = useState({} as Planet);

    //if initial ship positions are given, use them
    useEffect(() => {
        if (startingShipPos.x !== 0) setXPos(startingShipPos.x);
        if (startingShipPos.y !== 0) setYPos(startingShipPos.y);
        if (startingShipPos.r !== 0) setRotation(startingShipPos.r);
    }, []);

    const addParticle = () => {
        let key = Math.random()*200000;
        let [x, y] = bottomOfShip(rotation);
        let [xVel, yVel] = thrusterVelocity(rotation);

        let ref: RefObject<HTMLDivElement> = createRef();
        let obj = {
            particle: <Particle ref={ref} key={key} ixPos={xPos+x} iyPos={yPos+y} xVel={xVel*THRUSTER_SPEED} yVel={yVel*THRUSTER_SPEED} rotation={rotation}/>,
            ref: ref
        }

        setParticleArr(arr => {
            return [...arr, obj];
        });
    }

    //remove particles that have faded out
    const cleanParticles = () => {
        let firstParticle = particleArr[0];
        if (!firstParticle) return;

        let current = firstParticle.ref.current;
        if (!current) return;

        let opacity = parseFloat(current.style?.opacity);
        if (opacity <= 0.2) {
            setParticleArr(arr => {
                arr.shift();
                return arr;
            });
        }
    }

    const checkDistanceToPlanets = () => {
        for (let i = 0; i < planets.length; i++) {
            let { x, y, size } = planets[i];
            let distance = distanceFromAToB([xPos, yPos], [x+size/2, y+size/2]);
            if (distance < size/2) {
                setCloseTo(planets[i]);
                return;
            }
        }
        setCloseTo({} as Planet);
    }

    // console.log(window.innerHeight/window.devicePixelRatio, window.innerWidth/window.devicePixelRatio);

    const everyFrame = () => {
        cleanParticles();
        checkDistanceToPlanets();
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        // window.scrollTo(xPos-document.body.clientWidth/2, yPos-document.body.clientHeight/2);
        window.scrollTo(xPos-windowWidth/2, yPos-windowHeight/2);

        setXPos(xPos => {
            if (xPos < -20) return SPACE_WIDTH+20 + xVel;
            if (xPos > SPACE_WIDTH+20) return -20 + xVel;
            return xPos + xVel;
        });
        setYPos(yPos => {
            if (yPos < -20) return SPACE_HEIGHT+20 + yVel;
            if (yPos > SPACE_HEIGHT+20) return -20 + yVel;
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

            //make sure velocity doesn't exceed max value
            let adjusted = xVel+xAdjust > MAX_SPEED || xVel+xAdjust < -MAX_SPEED || yVel+yAdjust > MAX_SPEED || yVel+yAdjust < -MAX_SPEED;

            if (xVel > MAX_SPEED) setXVel(MAX_SPEED);
            if (xVel < -MAX_SPEED) setXVel(-MAX_SPEED);
            if (yVel > MAX_SPEED) setYVel(MAX_SPEED);
            if (yVel < -MAX_SPEED) setYVel(-MAX_SPEED);

            //if it does, don't increase it.
            if (adjusted) return;

            setXVel(xVel => xVel + xAdjust);
            setYVel(yVel => yVel + yAdjust);
        }

        if (keyPresses['ArrowDown']) {
            setXVel(xVel => {
                if (xVel > -0.5 && xVel < 0.5) return 0;
                if (xVel > 0) return xVel-(xVel*0.1);
                else return xVel-(xVel*0.1);
            });

            setYVel(yVel => {
                if (yVel > -0.5 && yVel < 0.5) return 0;
                if (yVel > 0) return yVel-(yVel*0.1);
                else return yVel-(yVel*0.1);
            });
        }
    }

    const keyDownListener = (e: KeyboardEvent) => {
        if (ALLOWABLE_KEYS.includes(e.code)) e.preventDefault();

        setKeyPresses(keyPresses => {
            keyPresses[e.code] = true;
            return keyPresses;
        });

        if (e.code === 'Enter') {
            if (closeTo.label) {
                closeTo.onVisit({x: xPos, y: yPos, r: rotation});
            }
        }
    }

    const keyUpListener = (e: KeyboardEvent) => {
        if (ALLOWABLE_KEYS.includes(e.code)) e.preventDefault();
        
        setKeyPresses(keyPresses => {
            keyPresses[e.code] = false;
            return keyPresses;
        });
    }

    useEffect(() => {
        window.addEventListener('keydown', keyDownListener);
        window.addEventListener('keyup', keyUpListener);

        let interval = setInterval(everyFrame, FRAME_SPEED);

        return () => {
            window.removeEventListener('keydown', keyDownListener);
            window.removeEventListener('keyup', keyUpListener);
            clearInterval(interval);
        }
    }, [rotation, xVel, yVel, particleArr, everyFrame]);

    return (
        <>
            { 
                particleArr.map((obj: ParticleObj) => obj.particle)
            }
            <StyledShip xPos={xPos} yPos={yPos} rotation={rotation}/>
            {
                closeTo.label 
                    ? <Label x={closeTo.x + closeTo.size/2} y={closeTo.y + closeTo.size/2 + 30} label={closeTo.visitLabel}/>
                    : null
            }
        </>
    );
}

export default Ship;