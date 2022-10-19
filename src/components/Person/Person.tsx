import { createRef, RefObject, useEffect, useState, useCallback } from 'react';

import { FRAME_SPEED, GROUND_WIDTH, GROUND_HEIGHT  } from "../../utils/constants";
import { ItemProps as Item } from '../Item/Item';
import { TerrainBlock } from '../Terrain/Terrain';
import { ParticleObj } from '../Ship/Ship';

import StyledPerson from './Person.style';
import Particle from '../Particle/Particle';
import Label from '../Label/Label';

const ALLOWABLE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'];
const GRAVITY = 1;
const MAX_FALL_SPEED = -10;
const JETPACK_FORCE = 2;

type KeyPresses = {
    [key: string]: boolean;
}

type PersonProps = {
    blocks: TerrainBlock[];
    items: Item[];
    onLeave: () => void;
}

const Person = ({blocks, items, onLeave}: PersonProps) => {
    const [teleporting, setTeleporting] = useState(true);
    const [leaving, setLeaving] = useState(false);
    const [xPos, setXPos] = useState(100);
    const [yPos, setYPos] = useState(160);
    const [xVel, setXVel] = useState(0);
    const [yVel, setYVel] = useState(0);
    const [particleArr, setParticleArr] = useState([] as ParticleObj[]);
    const [keyPresses, setKeyPresses] = useState({} as KeyPresses);
    const [closeTo, setCloseTo] = useState({} as Item);
    
    const everyFrame = useCallback(() => {
        const above = (x: number, y: number, width: number) => {
            if (xPos > x && xPos < x+width && yPos > y) return true;
            return false;
        }

        const checkCollisions = () => {
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i];
                let adjustedY = block.y+block.height+50;
                let adjustedX = block.x-30;

                let isAbove = above(adjustedX, adjustedY, block.width);
                if (!isAbove) continue;

                if (yPos-20 < adjustedY && yPos > adjustedY && yVel < 0) {
                    setYPos(adjustedY+10);
                    setYVel(0);
                }
            }
        }

        const checkItemCollisions = () => {
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let adjustedY = item.y;
                let adjustedX = item.x;

                let isAbove = above(adjustedX, adjustedY, item.width);
                if (!isAbove) continue;

                if (yPos < adjustedY+item.width && yPos > adjustedY+50) {
                    if (xVel > 0 || xVel < 0 || yVel > 0 || yVel < -1) {
                        if (closeTo !== item) setCloseTo(item);
                    }
                    return;
                }
            }
            setCloseTo({} as Item);
        }
    
        const addParticle = () => {
            let key = Math.random()*200000;
    
            let ref: RefObject<HTMLDivElement> = createRef();
            let randomX = Math.random()*45;
            let adjustedY = window.innerHeight - yPos + 130;
            let obj = {
                particle: <Particle ref={ref} key={key} ixPos={xPos+randomX} iyPos={adjustedY+0} xVel={0} yVel={1} rotation={0} color='blue'/>,
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
                    if (yVel >= 10) return 10;
                    return yVel + JETPACK_FORCE;
                });
            }
    
            if (keyPresses['ArrowDown']) {
                if (yVel === 0 && yPos > 160) {
                    setYPos(yPos => yPos-10);
                }
            }
        }

        if (teleporting) addParticle();
        cleanParticles();

        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        window.scrollTo(xPos-windowWidth/2, (windowHeight/2)-yPos);

        if (teleporting) return;

        manageKeyPresses();

        //adjust for gravity
        setYVel(yVel => {
            if (yVel < MAX_FALL_SPEED) return MAX_FALL_SPEED;
            return yVel - GRAVITY;
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
        checkItemCollisions();
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

        if (e.code === 'Enter') {
            if (closeTo.url) window.open(closeTo.url, '_blank');
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
                    onLeave();
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
            {
                closeTo.name 
                    ? <Label x={closeTo.x + closeTo.width/2} y={window.innerHeight-closeTo.y+95} label={closeTo.name}/>
                    : null
            }
        </>
    );
}

export default Person;