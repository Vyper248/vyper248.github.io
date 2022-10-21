import { GROUND_WIDTH, GROUND_HEIGHT  } from "../../utils/constants";

import { ParticleObj } from "../Ship/Ship";
import { TerrainBlock } from "../Terrain/Terrain";
import { ItemProps as Item } from "../Item/Item";

const GRAVITY = 1;
const MAX_FALL_SPEED = -10;

export const cleanParticleArr = (arr: ParticleObj[], setter: React.Dispatch<React.SetStateAction<ParticleObj[]>>) => {
    let firstParticle = arr[0];
    if (!firstParticle) return;

    let current = firstParticle.ref.current;
    if (!current) return;

    let opacity = parseFloat(current.style?.opacity);
    if (opacity <= 0.2) {
        setter(arr => {
            arr.shift();
            return arr;
        });
    }
}

const above = (xPos: number, yPos: number, x: number, y: number, width: number) => {
    if (xPos > x && xPos < x+width && yPos > y) return true;
    return false;
}

export const checkCollisions = (blocks: TerrainBlock[], xPos: number, yPos: number, yVel: number): [boolean, number, number] => {
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        let adjustedY = block.y+block.height+50;
        let adjustedX = block.x-30;

        let isAbove = above(xPos, yPos, adjustedX, adjustedY, block.width);
        if (!isAbove) continue;

        if (yPos-20 < adjustedY && yPos > adjustedY && yVel < 0) {
            return [true, adjustedY+10, 0];
        }
    }

    return [false, 0, 0];
}

export const checkItemCollisions = (items: Item[], xPos: number, yPos: number, xVel: number, yVel: number, closeTo: Item): Item | null => {
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let adjustedY = item.y;
        let adjustedX = item.x;

        let isAbove = above(xPos, yPos, adjustedX, adjustedY, item.width);
        if (!isAbove) continue;

        if (yPos < adjustedY+item.width && yPos > adjustedY+50) {
            if (xVel > 0 || xVel < 0 || yVel > 0 || yVel < -1) {
                if (closeTo !== item) return item;
            }
            return null;
        }
    }

    if (Object.values(closeTo).length === 0) return null;
    
    return {} as Item;
}

export const adjustPosition = (xVel: number, yVel: number, 
                        setXPos: React.Dispatch<React.SetStateAction<number>>, 
                        setYPos: React.Dispatch<React.SetStateAction<number>>, 
                        setYVel: React.Dispatch<React.SetStateAction<number>>
) => {
    //adjust for gravity
    setYVel((yVel: number) => {
        if (yVel < MAX_FALL_SPEED) return MAX_FALL_SPEED;
        return yVel - GRAVITY;
    });

    setXPos((xPos: number) => {
        if (xPos < -20) return -20;
        if (xPos > GROUND_WIDTH-20) return GROUND_WIDTH-20;
        return xPos + xVel;
    });

    setYPos((yPos: number) => {
        if (yPos < -50) return -50;
        if (yPos+yVel > GROUND_HEIGHT-20) return GROUND_HEIGHT-19;
        return yPos + yVel;
    });
}