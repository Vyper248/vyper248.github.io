import { useCallback, useEffect } from 'react';
import StyledName from './Name.style';
import { useAppSelector } from '../../../redux/hooks';

import { getPoints } from '../../../utils/utils';

import NameParticle from './Name.particle';

const Name = () => {
    const pointArr = getPoints('chris wilson');

    return (
        <StyledName>
            { 
                pointArr.map(point => {
                    let [x, y] = point;
                    return <NameParticle key={`${x}-${y}`} x={x} y={y}/>
                })
            }
        </StyledName>
    );
}

export default Name;