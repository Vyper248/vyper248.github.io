import { PlanetProps as Planet } from "../Planet/Planet";

import { FRAME_SPEED } from "../../../utils/constants";

const MOVE_SPEED = 0.2*FRAME_SPEED/30;

export const direction = (rotation: number, type: 'forward' | 'backward'): [number, number] => {
    let rotationAdjust = type === 'forward' ? -90 : 90;
    let rotationRad = (rotation+rotationAdjust) * Math.PI / 180;
    let yAdjust = MOVE_SPEED * Math.sin(rotationRad);
    let xAdjust = MOVE_SPEED * Math.cos(rotationRad);
    return [xAdjust, yAdjust];
}

export const bottomOfShip = (rotation: number): [number, number] => {
    let positionAdjust = (Math.random() * 8) - 4;
    let rotationRad = (rotation+90) * Math.PI / 180;
    let yAdjust = 30 * Math.sin(rotationRad) + 19 + positionAdjust;
    let xAdjust = 30 * Math.cos(rotationRad) + 14 + positionAdjust;
    return [xAdjust, yAdjust];
}

export const thrusterVelocity = (rotation: number): [number, number] => {
    let rotationAdjust = (Math.random() * 50) - 20;
    let rotationRad = (rotation+90+rotationAdjust) * Math.PI / 180;
    let yAdjust = MOVE_SPEED * Math.sin(rotationRad);
    let xAdjust = MOVE_SPEED * Math.cos(rotationRad);
    return [xAdjust, yAdjust];
}

export const magnitude = (x: number, y: number): number => {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export const normaliseVector = (x: number, y: number, mag: number): [number, number] => {
    if (mag > 0) return [x / mag, y / mag];
    else return [x, y];
}

const distanceFromAToB = (a: [number, number], b: [number, number]): number => {
    let xDiff = b[0] - a[0];
    let yDiff = b[1] - a[1];
    let distance = magnitude(xDiff, yDiff);
    return distance;
}

export const checkDistanceToPlanets = (planets: Planet[], xPos: number, yPos: number, closeTo: Planet): Planet | null => {
    for (let i = 0; i < planets.length; i++) {
        let { x, y, size } = planets[i];
        let distance = distanceFromAToB([xPos, yPos], [x+size/2, y+size/2]);
        if (distance < size/2) {
            return planets[i];
        }
    }

    if (Object.values(closeTo).length === 0) return null;

    return {} as Planet;
}