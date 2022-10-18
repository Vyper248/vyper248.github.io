import StyledGamified from "./Gamified.style";

import Ship from "../../components/Ship/Ship";
import Stars from "../../components/Stars/Stars";
import Planet from "../../components/Planet/Planet";

import Platformer from "../Platformer/Platformer";

import { SPACE_WIDTH, SPACE_HEIGHT } from "../../utils/constants";
import { useState } from "react";

export type Planet = {
    label: string;
    x: number;
    y: number;
    size: number;
    color: string;
    colorLeft: string;
    colorRight: string;
    onVisit: () => void;
    visitLabel: string;
}

const Gamified = () => {
    const [platformStyle, setPlatformStyle] = useState({
        groundColor: 'green',
        skyColor: 'skyblue'
    });

    const planets: Planet[] = [
        {
            label: 'Projects',
            x: 245,
            y: 543,
            size: 300,
            color: '#0000FF',
            colorLeft: 'green',
            colorRight: 'green',
            onVisit: () => console.log('Visiting Projects'),
            visitLabel: 'Press Enter to land'
        },
        {
            label: 'Skills',
            x: 845,
            y: 200,
            size: 200,
            color: '#C2C2C2',
            colorLeft: '#686868',
            colorRight: '#686868',
            onVisit: () => console.log('Visiting Skills'),
            visitLabel: 'Press Enter to land'
        },
        {
            label: 'GitHub',
            x: 1100,
            y: 700,
            size: 250,
            color: '#Fa8362',
            colorLeft: '#E97251',
            colorRight: '#E97251',
            onVisit: () => window.open('https://github.com/vyper248', '_blank'),
            visitLabel: 'Press Enter to visit'
        }
    ];

    return (
        <StyledGamified width={SPACE_WIDTH} height={SPACE_HEIGHT}>
            {/* <Stars width={SPACE_WIDTH} height={SPACE_HEIGHT} qty={200}/>
            {
                planets.map((planet) => {
                    let { label, ...rest } = planet;
                    return <Planet key={label} label={label} {...rest}/>
                })
            }
            <Ship planets={planets}/> */}
            <Platformer blockStyle={platformStyle} planetName='Projects'/>
        </StyledGamified>
    );
}

export default Gamified;