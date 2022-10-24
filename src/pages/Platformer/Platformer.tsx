import Person from '../../components/Person/Person';
import Terrain from '../../components/Terrain/Terrain';

import StyledPlatformer from './Platformer.style';

import { GROUND_WIDTH, GROUND_HEIGHT } from '../../utils/constants';
import { projectsLayout, skillsLayout } from './layouts';
import { projects } from './projects';
import { TerrainBlock } from '../../components/Terrain/Terrain';

import Stars from '../../components/Stars/Stars';
import Item, { ItemProps } from '../../components/Item/Item';

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

type Position = {
    x: number;
    y: number;
}

const Platformer = ({blockStyle, planetName, onLeave}: PlatformerProps) => {
    let selectedLayout = projectsLayout;
    let selectedItems = projects;

    if (planetName === 'Skills') {
        //change to different layout
        selectedLayout = skillsLayout;
        selectedItems = [];
    }

    const getAvailablePositions = (layout: TerrainBlock[]) => {
        let positions: Position[] = [];

        layout.forEach(layoutObj => {
            let y = layoutObj.y;
            let xAdjust = layoutObj.label ? layoutObj.label.length * 7 : 0;

            for (let x = layoutObj.x+20+xAdjust; x < layoutObj.x + layoutObj.width - 100; x += 200) {
                positions.push({x, y});
            }
        });

        return positions;
    }
    
    const mapAvailablePositions = (positions: Position[], items: ItemProps[]) => {
        return items.flatMap((itemObj, i) => {
            let position = positions[i];
            if (!position) return [];
            return {...itemObj, x: position.x, y: position.y};
        });
    }
    
    let positions = getAvailablePositions(selectedLayout);
    console.log(positions);
    let positionedItems = mapAvailablePositions(positions, selectedItems);

    return (
        <StyledPlatformer>
            <Stars width={GROUND_WIDTH} height={GROUND_HEIGHT} qty={200}/>
            <Terrain layout={selectedLayout} blockStyle={blockStyle}/>
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