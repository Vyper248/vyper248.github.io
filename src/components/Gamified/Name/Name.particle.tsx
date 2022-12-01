import { StyledParticle } from "./Name.style";

const NameParticle = ({ x, y }: { x:number; y: number}) => {
    return (
        <StyledParticle x={x} y={y}></StyledParticle>
    )
}

export default NameParticle;