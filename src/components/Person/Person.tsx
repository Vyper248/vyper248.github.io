import { useEffect, useState } from 'react';

import { FRAME_SPEED, GROUND_WIDTH, GROUND_HEIGHT  } from "../../utils/constants";
import { TerrainBlock } from '../Terrain/Terrain';

import StyledPerson from './Person.style';

const ALLOWABLE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];
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
    const [xPos, setXPos] = useState(100);
    const [yPos, setYPos] = useState(800);
    const [xVel, setXVel] = useState(0);
    const [yVel, setYVel] = useState(0);
    const [keyPresses, setKeyPresses] = useState({} as KeyPresses);

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
            if (isAbove) {
                if (yPos+20 > adjustedY && yPos < adjustedY && yVel > 0) {
                    setYPos(adjustedY-10);
                    setYVel(0);
                }
            }
        }
    }

    const everyFrame = () => {
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        // window.scrollTo(xPos-document.body.clientWidth/2, yPos-document.body.clientHeight/2);
        window.scrollTo(xPos-windowWidth/2, yPos-windowHeight/2 - 200);

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
    }

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

    return (
        <StyledPerson x={xPos} y={yPos}></StyledPerson>
    );
}

export default Person;