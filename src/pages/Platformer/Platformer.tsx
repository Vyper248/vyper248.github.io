import Person from '../../components/Gamified/Person/Person';
import Terrain from '../../components/Gamified/Terrain/Terrain';

import StyledPlatformer from './Platformer.style';

import { GROUND_WIDTH, GROUND_HEIGHT } from '../../utils/constants';
import { projectsLayout, skillsLayout } from './layouts';
import { projects } from '../../projects';
import { skills } from '../../skills';

import Stars from '../../components/Gamified/Stars/Stars';
import Item from '../../components/Gamified/Item/Item';
import GameControls from '../../components/Gamified/GameControls/GameControls';

import { getPositionedItems } from './Platformer.utils';

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
        selectedItems = skills;
    }

    let positionedItems = getPositionedItems(selectedItems, selectedLayout);

    return (
        <StyledPlatformer>
            <Stars width={GROUND_WIDTH} height={GROUND_HEIGHT} qty={200}/>
            <Terrain layout={selectedLayout} blockStyle={blockStyle}/>
            <GameControls layout={planetName}/>
            <Person blocks={selectedLayout} items={positionedItems} onLeave={onLeave}/>
            {
                positionedItems.map((item) => {
                    return <Item key={item.name} {...item}/>
                })
            }
        </StyledPlatformer>
    );
}

export default Platformer;