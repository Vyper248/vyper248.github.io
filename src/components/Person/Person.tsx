import React, { createRef, RefObject, useEffect, useState, useCallback } from 'react';

import { FRAME_SPEED, GROUND_HEIGHT  } from "../../utils/constants";
import { ItemProps as Item } from '../Item/Item';
import { TerrainBlock } from '../Terrain/Terrain';
import { ParticleObj } from '../Ship/Ship';

import { cleanParticleArr, checkCollisions, checkItemCollisions, adjustPosition } from './Person.utils';

import StyledPerson, { StyledHead, StyledBody, StyledBackpack, StyledLeftLeg, StyledRightLeg, StyledArm } from './Person.style';
import Particle from '../Particle/Particle';
import Label from '../Label/Label';

const ALLOWABLE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'];
const JETPACK_FORCE = 2;

type KeyPresses = {
    [key: string]: boolean;
}

type PersonProps = {
    blocks: TerrainBlock[];
    items: Item[];
    onLeave: () => void;
}

const addTeleportParticle = (setParticleArr: React.Dispatch<React.SetStateAction<ParticleObj[]>>) => {
    let key = Math.random()*200000;

    let ref: RefObject<HTMLDivElement> = createRef();
    let randomX = Math.random()*30;
    let randomY = Math.random()*80;
    let obj = {
        particle: <Particle ref={ref} key={key} ixPos={randomX} iyPos={-50 + randomY} xVel={0} yVel={1} rotation={0} color='blue'/>,
        ref: ref
    }

    setParticleArr(arr => {
        return [...arr, obj];
    });
}

const addJetpackParticle = (direction: number, xPos: number, yPos: number, setJetpackParticleArr: React.Dispatch<React.SetStateAction<ParticleObj[]>>) => {
    let key = Math.random()*200000;

    let ref: RefObject<HTMLDivElement> = createRef();
    let randomX = Math.random()*10;
    let randomYVel = Math.random();
    let xAdjust = direction < 0 ? 48 : 0;
    let obj = {
        particle: <Particle ref={ref} key={key} fadeRate={0.05} fromBottom={true} ixPos={xPos+randomX-5+xAdjust} iyPos={yPos-20} xVel={0} yVel={-1-randomYVel} rotation={0} color='red'/>,
        ref: ref
    }

    setJetpackParticleArr(arr => {
        return [...arr, obj];
    });
}

const Person = ({blocks, items, onLeave}: PersonProps) => {
    const [teleporting, setTeleporting] = useState(true);
    const [leaving, setLeaving] = useState(false);

    const [xPos, setXPos] = useState(100);
    const [yPos, setYPos] = useState(160);
    const [xVel, setXVel] = useState(0);
    const [yVel, setYVel] = useState(0);
    const [direction, setDirection] = useState(1);

    const [particleArr, setParticleArr] = useState([] as ParticleObj[]);
    const [jetpackParticleArr, setJetpackParticleArr] = useState([] as ParticleObj[]);
    const [usingJetpack, setUsingJetpack] = useState(false);
    const [colliding, setColliding] = useState(false);
    
    const [keyPresses, setKeyPresses] = useState({} as KeyPresses);
    const [closeTo, setCloseTo] = useState({} as Item);

    const manageKeyPresses = useCallback(() => {
        let moving = false;

        if (keyPresses['ArrowRight']) {
            setXVel(5);
            setDirection(1);
            setColliding(false);
            moving = true;
        }

        if (keyPresses['ArrowLeft']) {
            setXVel(-5);
            setDirection(-1);
            setColliding(false);
            moving = true;
        }

        if (!keyPresses['ArrowRight'] && !keyPresses['ArrowLeft']) {
            setXVel(0);
        }

        if (keyPresses['Space'] || keyPresses['ArrowUp']) {
            addJetpackParticle(direction, xPos, yPos, setJetpackParticleArr);
            addJetpackParticle(direction, xPos, yPos, setJetpackParticleArr);
            addJetpackParticle(direction, xPos, yPos, setJetpackParticleArr);
            addJetpackParticle(direction, xPos, yPos, setJetpackParticleArr);
            setYVel(yVel => {
                if (yVel >= 10) return 10;
                return yVel + JETPACK_FORCE;
            });
            setUsingJetpack(true);
            setColliding(false);
            moving = true;
        } else {
            setUsingJetpack(false);
        }

        if (keyPresses['ArrowDown']) {
            if (yVel === 0 && yPos > 160) {
                setYPos(yPos => yPos-10);
            }
            setColliding(false);
            moving = true;
        }

        return moving;
    }, [xPos, yPos, yVel, direction, keyPresses]);

    const everyFrame = useCallback(() => {      
        //clean old particles that have faded out. Do multiple times for jetpack particles as 4 are added at a time
        cleanParticleArr(particleArr, setParticleArr);
        cleanParticleArr(jetpackParticleArr, setJetpackParticleArr);
        cleanParticleArr(jetpackParticleArr, setJetpackParticleArr);
        cleanParticleArr(jetpackParticleArr, setJetpackParticleArr);
        cleanParticleArr(jetpackParticleArr, setJetpackParticleArr);
        
        //when teleporting, add particles
        if (teleporting) addTeleportParticle(setParticleArr);

        //set scroll position
        let windowWidth = window.innerWidth;
        window.scrollTo(xPos-windowWidth/2, (GROUND_HEIGHT/2)-yPos+50);

        //if teleporting, prevent movement
        if (teleporting) return;

        //Manage key presses and check whether character has moved
        let moving = manageKeyPresses();

        //if it has moved then keep going, otherwise if it's colliding and hasn't moved, don't do anything else
        if (colliding && !moving) return;

        //Adjust positioning
        adjustPosition(xVel, yVel, setXPos, setYPos, setYVel);
        
        //check collisions with terrain blocks
        const [adjustValues, newYPos, newYVel] = checkCollisions(blocks, xPos, yPos, yVel);
        if (adjustValues) {
            setYPos(newYPos);
            setYVel(newYVel);
            setColliding(true);
        }

        //check collisions with items (such as project buildings);
        let collidedWith = checkItemCollisions(items, xPos, yPos, xVel, yVel, closeTo);
        if (collidedWith) setCloseTo(collidedWith);

    }, [colliding, manageKeyPresses, teleporting, xPos, xVel, yPos, yVel, blocks, particleArr, closeTo, items, jetpackParticleArr]);

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

        if (e.code === 'Escape') {
            setTeleporting(true);
            setLeaving(true);
        }

        if (e.code === 'Enter') {
            if (closeTo.url) window.open(closeTo.url, '_blank');
        }
    }, [closeTo]);

    //start main interval for each frame
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

    //deal with teleporting - arriving and leaving
    useEffect(() => {
        if (teleporting) {
            let timeout = setTimeout(() => {
                setTeleporting(false);

                if (leaving) {
                    onLeave();
                }
            }, 1000);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [teleporting, leaving, onLeave]);

    return (
        <>
            <StyledPerson x={xPos} y={yPos} leaving={leaving} flipped={direction < 0}>
                <StyledHead/>
                <StyledBody/>
                <StyledArm moving={xVel !== 0 && !usingJetpack}/>
                <StyledBackpack/>
                <StyledLeftLeg moving={xVel !== 0 && !usingJetpack}/>
                <StyledRightLeg moving={xVel !== 0 && !usingJetpack}/>
            { 
                particleArr.map((obj: ParticleObj) => obj.particle)
            }
            </StyledPerson>
            {
                jetpackParticleArr.map((obj: ParticleObj) => obj.particle)
            }
            {
                closeTo.name 
                    ? <Label fromBottom={true} x={closeTo.x + closeTo.width/2} y={closeTo.y-15} label={closeTo.name}/>
                    : null
            }
        </>
    );
}

export default Person;