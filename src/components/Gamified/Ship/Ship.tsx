import { useEffect, useState, createRef, RefObject, useCallback } from "react";

import StyledShip from "./Ship.style";
import ShipImage from '../../../svgs/ship.svg';

import { FRAME_SPEED, SPACE_WIDTH, SPACE_HEIGHT } from "../../../utils/constants";
import { PlanetProps as Planet } from "../Planet/Planet";

import { cleanParticleArr } from "../Person/Person.utils";
import { checkDistanceToPlanets, thrusterVelocity, bottomOfShip, direction, magnitude, normaliseVector } from "./Ship.utils";

import Particle from "../Particle/Particle";
import Label from "../Label/Label";

const ROTATION_SPEED = 10*FRAME_SPEED/30;
const THRUSTER_SPEED = 30;
const MAX_SPEED = 5;
const ALLOWABLE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'];

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

const addParticle = (xPos: number, yPos: number, rotation: number, setParticleArr: React.Dispatch<React.SetStateAction<ParticleObj[]>>) => {
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
        // eslint-disable-next-line
    }, []);

    //adjust scroll position when ship position changes, if needed
    useEffect(() => {
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        window.scrollTo(xPos-windowWidth/2, yPos-windowHeight/2);
    }, [xPos, yPos]);

    const manageKeyPresses = useCallback(() => {
        if (keyPresses['ArrowRight']) {
            setRotation(rotation => rotation+ROTATION_SPEED);
        }

        if (keyPresses['ArrowLeft']) {
            setRotation(rotation => rotation-ROTATION_SPEED);
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

        if (keyPresses['ArrowUp']) {
            let [xAdjust, yAdjust] = direction(rotation, 'forward');
            addParticle(xPos, yPos, rotation, setParticleArr);

            let speed = magnitude(xVel+xAdjust, yVel+yAdjust);
            if (speed > MAX_SPEED) {
                let [newXVel, newYVel] = normaliseVector(xVel+xAdjust, yVel+yAdjust, speed);
                setXVel(newXVel*MAX_SPEED);
                setYVel(newYVel*MAX_SPEED);
            } else {
                setXVel(xVel => xVel + xAdjust);
                setYVel(yVel => yVel + yAdjust);
            }

        }
    }, [rotation, xPos, yPos, xVel, yVel, setParticleArr, keyPresses]);

    const everyFrame = useCallback(() => {
        if (particleArr.length > 0) cleanParticleArr(particleArr, setParticleArr);
        
        manageKeyPresses();
        
        if (xVel === 0 && yVel === 0) return;

        let closeToPlanet = checkDistanceToPlanets(planets, xPos, yPos, closeTo);
        if (closeToPlanet) setCloseTo(closeToPlanet);

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
    }, [xVel, yVel, xPos, yPos, particleArr, manageKeyPresses, planets, closeTo]);

    const keyDownListener = useCallback((e: KeyboardEvent) => {
        if (ALLOWABLE_KEYS.includes(e.code)) e.preventDefault();

        setKeyPresses(keyPresses => {
            keyPresses[e.code] = true;
            return keyPresses;
        });
    }, []);

    const keyUpListener = useCallback((e: KeyboardEvent) => {
        if (ALLOWABLE_KEYS.includes(e.code)) e.preventDefault();
        
        setKeyPresses(keyPresses => {
            keyPresses[e.code] = false;
            return keyPresses;
        });

        if (e.code === 'Enter') {
            if (closeTo.label) {
                closeTo.onVisit({x: xPos, y: yPos, r: rotation});
            }
        }
    }, [closeTo, xPos, yPos, rotation]);

    useEffect(() => {
        window.addEventListener('keydown', keyDownListener);
        window.addEventListener('keyup', keyUpListener);

        let interval = setInterval(everyFrame, FRAME_SPEED);

        return () => {
            window.removeEventListener('keydown', keyDownListener);
            window.removeEventListener('keyup', keyUpListener);
            clearInterval(interval);
        }
    }, [everyFrame, keyDownListener, keyUpListener]);

    return (
        <>
            { 
                particleArr.map((obj: ParticleObj) => obj.particle)
            }
            <StyledShip xPos={xPos} yPos={yPos} rotation={rotation}><img src={ShipImage} alt='Players ship'/></StyledShip>
            {
                closeTo.label 
                    ? <Label x={closeTo.x + closeTo.size/2} y={closeTo.y + closeTo.size/2 + 30} label={closeTo.visitLabel}/>
                    : null
            }
        </>
    );
}

export default Ship;