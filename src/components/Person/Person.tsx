import { createRef, RefObject, useEffect, useState, useCallback } from 'react';

import { FRAME_SPEED, GROUND_WIDTH, GROUND_HEIGHT  } from "../../utils/constants";
import { TerrainBlock } from '../Terrain/Terrain';
import { ParticleObj } from '../Ship/Ship';

import StyledPerson from './Person.style';

import Particle from '../Particle/Particle';

const ALLOWABLE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'];
const GRAVITY = 1;
const MAX_FALL_SPEED = 10;
const JETPACK_FORCE = 2;

type KeyPresses = {
    [key: string]: boolean;
}

type PersonProps = {
    blocks: TerrainBlock[];
}

const Person = ({blocks}: PersonProps) => {
    const [teleporting, setTeleporting] = useState(true);
    const [leaving, setLeaving] = useState(false);
    const [xPos, setXPos] = useState(100);
    const [yPos, setYPos] = useState(840);
    const [xVel, setXVel] = useState(0);
    const [yVel, setYVel] = useState(0);
    const [particleArr, setParticleArr] = useState([] as ParticleObj[]);
    const [keyPresses, setKeyPresses] = useState({} as KeyPresses);
    
    const everyFrame = useCallback(() => {
        const above = (x: number, y: number, width: number) => {
            if (xPos > x && xPos < x+width && yPos < y) return true;
            return false;
        }

        const checkCollisions = () => {
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i];
                let adjustedY = block.y-50;
                let adjustedX = block.x-30;

                let isAbove = above(adjustedX, adjustedY, block.width);
                if (!isAbove) continue;

                if (yPos+20 > adjustedY && yPos < adjustedY && yVel > 0) {
                    setYPos(adjustedY-10);
                    setYVel(0);
                }
            }
        }
    
        const addParticle = () => {
            let key = Math.random()*200000;
    
            let ref: RefObject<HTMLDivElement> = createRef();
            let randomX = Math.random()*45;
            let obj = {
                particle: <Particle ref={ref} key={key} ixPos={xPos+randomX} iyPos={yPos+0} xVel={0} yVel={1} rotation={0} color='blue'/>,
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

        const manageKeyPresses = () => {
            if (keyPresses['ArrowRight']) {
                setXVel(5);
            }
    
            if (keyPresses['ArrowLeft']) {
                setXVel(-5);
            }
    
            if (!keyPresses['ArrowRight'] && !keyPresses['ArrowLeft']) {
                setXVel(0);
            }
    
            if (keyPresses['Space'] || keyPresses['ArrowUp']) {
                setYVel(yVel => {
                    if (yVel <= -10) return -10;
                    return yVel - JETPACK_FORCE;
                });
            }
    
            if (keyPresses['ArrowDown']) {
                if (yVel === 0 && yPos < 840) {
                    setYPos(yPos => yPos+10);
                }
            }
        }

        if (teleporting) addParticle();
        cleanParticles();

        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        window.scrollTo(xPos-windowWidth/2, yPos-windowHeight/2 - 200);

        if (teleporting) return;

        manageKeyPresses();

        setYVel(yVel => {
            if (yVel > MAX_FALL_SPEED) return MAX_FALL_SPEED;
            return yVel + GRAVITY;
        });

        setXPos(xPos => {
            if (xPos < -20) return -20;
            if (xPos > GROUND_WIDTH-20) return GROUND_WIDTH-20;
            return xPos + xVel;
        });

        setYPos(yPos => {
            if (yPos < -50) return -50;
            if (yPos+yVel > GROUND_HEIGHT-20) return GROUND_HEIGHT-19;
            return yPos + yVel;
        });

        checkCollisions();
    }, [teleporting, keyPresses, xPos, xVel, yPos, yVel, blocks, particleArr]);

    const keyDownListener = (e: KeyboardEvent) => {
        if (ALLOWABLE_KEYS.includes(e.code)) e.preventDefault();

        setKeyPresses(keyPresses => {
            keyPresses[e.code] = true;
            return keyPresses;
        });

        if (e.code === 'Enter') {

        }
    }

    const keyUpListener = (e: KeyboardEvent) => {
        if (ALLOWABLE_KEYS.includes(e.code)) e.preventDefault();
        
        setKeyPresses(keyPresses => {
            keyPresses[e.code] = false;
            return keyPresses;
        });

        if (e.code === 'Escape') {
            setTeleporting(true);
            setLeaving(true);
        }
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
    }, [everyFrame]);

    useEffect(() => {
        if (teleporting) {
            let timeout = setTimeout(() => {
                setTeleporting(false);

                if (leaving) {
                    console.log('leaving');
                }
            }, 1000);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [teleporting]);

    return (
        <>
            <StyledPerson x={xPos} y={yPos} leaving={leaving}></StyledPerson>
            { 
                particleArr.map((obj: ParticleObj) => obj.particle)
            }
        </>
    );
}

export default Person;