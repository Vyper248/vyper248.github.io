import StyledPlanet from './Planet.style';

import { Planet as PlanetProps } from '../../pages/Gamified/Gamified';

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