import StyledGamified from "./Gamified.style";

import Ship from "../../components/Ship/Ship";
import Stars from "../../components/Stars/Stars";
import Planet from "../../components/Planet/Planet";

import Platformer from "../Platformer/Platformer";
import { ShipPos } from "../../components/Ship/Ship";
import { PlanetProps } from "../../components/Planet/Planet";

import { SPACE_WIDTH, SPACE_HEIGHT } from "../../utils/constants";
import { useCallback, useState } from "react";

const greenStyle = {
    groundColor: 'green',
    groundColorFront: '#76512F',
    skyColor: 'skyblue',
}

const grayStyle = {
    groundColor: '#C2C2C2',
    groundColorFront: '#686868',
    skyColor: 'transparent'
}

const Gamified = () => {
    const [landed, setLanded] = useState(false);
    const [planetName, setPlanetName] = useState('');
    const [shipPosition, setShipPosition] = useState({x: 0, y: 0, r: 0} as ShipPos);

    const [platformStyle, setPlatformStyle] = useState(greenStyle);

    const planets: PlanetProps[] = [
        {
            label: 'Projects',
            x: 245,
            y: 543,
            size: 300,
            color: '#0000FF',
            colorLeft: 'green',
            colorRight: 'green',
            onVisit: (shipPos: ShipPos) => {
                setLanded(true); 
                setShipPosition(shipPos);
                setPlatformStyle(greenStyle);
                setPlanetName('Projects');
            },
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
            onVisit: (shipPos: ShipPos) => {
                setLanded(true); 
                setShipPosition(shipPos);
                setPlatformStyle(grayStyle);
                setPlanetName('Skills');
            },
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

    const onLeave = useCallback(() => {
        setLanded(false);
    }, []);

    return (
        <StyledGamified width={SPACE_WIDTH} height={SPACE_HEIGHT}>
            { 
                landed 
                    ? <Platformer blockStyle={platformStyle} planetName={planetName} onLeave={onLeave}/> 
                    : (
                        <>
                            <Stars width={SPACE_WIDTH} height={SPACE_HEIGHT} qty={200}/>
                            {
                                planets.map((planet) => {
                                    let { label, ...rest } = planet;
                                    return <Planet key={label} label={label} {...rest}/>
                                })
                            }
                            <Ship planets={planets} startingShipPos={shipPosition}/>
                        </>
                    )
            }
        </StyledGamified>
    );
}

export default Gamified;