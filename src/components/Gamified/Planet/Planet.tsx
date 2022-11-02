import StyledPlanet from './Planet.style';

import { ShipPos } from '../Ship/Ship';

export type PlanetProps = {
    label: string;
    x: number;
    y: number;
    size: number;
    color: string;
    colorLeft: string;
    colorRight: string;
    onVisit: (shipPos: ShipPos) => void;
    visitLabel: string;
}

const Planet = ({label, onVisit, ...rest}: PlanetProps) => {
    return (
        <StyledPlanet {...rest}>
            <div>
                {label}
            </div>
        </StyledPlanet>
    )
}

export default Planet;