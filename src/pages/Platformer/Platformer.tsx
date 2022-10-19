import Person from '../../components/Person/Person';
import Terrain from '../../components/Terrain/Terrain';

import StyledPlatformer from './Platformer.style';

import { GROUND_WIDTH, GROUND_HEIGHT } from '../../utils/constants';
import { projectsLayout, skillsLayout } from './layouts';
import { projects } from './projects';

import Stars from '../../components/Stars/Stars';
import Item from '../../components/Item/Item';

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
    let selectedItems = projects;

    if (planetName === 'Skills') {
        //change to different layout
        selectedLayout = skillsLayout;
        selectedItems = [];
    }

    return (
        <StyledPlatformer>
            <Stars width={GROUND_WIDTH} height={GROUND_HEIGHT} qty={200}/>
            <Terrain layout={selectedLayout} blockStyle={blockStyle}/>
            <Person blocks={selectedLayout} items={selectedItems} onLeave={onLeave}/>
            {
                selectedItems.map(item => {
                    return <Item key={item.name} {...item}/>
                })
            }
        </StyledPlatformer>
    );
}

export default Platformer;