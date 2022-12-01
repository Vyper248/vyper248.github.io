import StyledName from './Name.style';

import { getPoints } from '../../../utils/utils';

import NameParticle from './Name.particle';

const Name = () => {
    const pointArr = getPoints('chris wilson');

    return (
        <StyledName>
            { 
                pointArr.map(point => {
                    let [x, y] = point;
                    return <NameParticle x={x} y={y}/>
                })
            }
        </StyledName>
    );
}

export default Name;