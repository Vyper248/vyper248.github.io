import Person from '../../components/Person/Person';
import Terrain from '../../components/Terrain/Terrain';

import { SPACE_WIDTH, SPACE_HEIGHT } from '../../utils/constants';
import { projectsLayout, skillsLayout } from './layouts';

import Stars from '../../components/Stars/Stars';

export type BlockStyle = {
    groundColor: string;
    groundColorFront: string;
    skyColor: string;
}

type PlatformerProps = {
    blockStyle: BlockStyle;
    planetName: string;
    onLeave: () => void;
}

const Platformer = ({blockStyle, planetName, onLeave}: PlatformerProps) => {
    let selectedLayout = projectsLayout;

    console.log(planetName);
    if (planetName === 'Skills') {
        //change to different layout
        selectedLayout = skillsLayout;
    }

    return (
        <div>
            <Stars width={SPACE_WIDTH} height={SPACE_HEIGHT} qty={200}/>
            <Terrain layout={selectedLayout} blockStyle={blockStyle}/>
            <Person blocks={selectedLayout} onLeave={onLeave}/>
        </div>
    );
}

export default Platformer;