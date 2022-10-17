import StyledPlanet from './Planet.style';

type PlanetProps = {
    x: number;
    y: number;
    size: number;
    color: string;
    colorLeft: string;
    colorRight: string;
    label: string;
}

const Planet = ({label, ...rest}: PlanetProps) => {
    return (
        <StyledPlanet {...rest}>
            <div>
                {label}
            </div>
        </StyledPlanet>
    )
}

export default Planet;