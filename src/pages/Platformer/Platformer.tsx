import Person from '../../components/Person/Person';
import Terrain from '../../components/Terrain/Terrain';

import StyledPlatformer from './Platformer.style';

import { GROUND_WIDTH, GROUND_HEIGHT } from '../../utils/constants';
import { projectsLayout, skillsLayout } from './layouts';
import { projects } from '../../projects';
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

type ItemGroup = {
    [key: string]: ItemProps[];
}

const Platformer = ({blockStyle, planetName, onLeave}: PlatformerProps) => {
    let selectedLayout = projectsLayout;
    let selectedItems = projects;

    if (planetName === 'Skills') {
        //change to different layout
        selectedLayout = skillsLayout;
        selectedItems = [];
    }

    const estimateLabelWidth = (label: string): number => {
        let maxLength = 0;
        label.split('\n').forEach(str => {
            if (str.length > maxLength) maxLength = str.length;
        });
        return maxLength;
    }

    //group items by their group name
    const getItemGroups = (items: ItemProps[]) => {
        const itemGroups = {} as ItemGroup;

        items.forEach(itemObj => {
            let itemLabel = itemObj.group;
            if (!itemGroups[itemLabel]) itemGroups[itemLabel] = [];
            itemGroups[itemLabel].push(itemObj);
        });

        return itemGroups;
    }

    const mapAvailablePositions = (itemGroups: ItemGroup, layout: TerrainBlock[]) => {
        let positionedItems = [] as ItemProps[];

        layout.forEach(layoutObj => {
            //get items linked to this layout block
            let itemsForGroup = itemGroups[layoutObj.label];
            if (!itemsForGroup) return;

            //get starting x position based on label width and layout x position
            let xAdjust = layoutObj.label ? estimateLabelWidth(layoutObj.label) * 8 : 0;
            let x = layoutObj.x + xAdjust + 20;

            //get array of items with position added
            let itemArr = itemsForGroup.map(itemObj => {
                x += 200;
                return {...itemObj, x: x-200, y: layoutObj.y};
            });

            //add to item array and set the layout width based on number of items so don't need to do it manually
            positionedItems.push(...itemArr);
            layoutObj.width = (itemsForGroup.length * 200) + xAdjust + 50;
        });

        return positionedItems;
    }

    //get array of items that have no linked terrain block, can console log so they can be fixed
    const getItemsNotPositioned = (itemGroups: ItemGroup, layout: TerrainBlock[]) => {
        let itemGroupKeys = Object.keys(itemGroups);
        let layoutLabels = layout.map(layoutObj => layoutObj.label);

        itemGroupKeys = itemGroupKeys.flatMap(itemGroupKey => {
            if (layoutLabels.includes(itemGroupKey)) return [];
            else return [itemGroupKey];
        });

        return itemGroupKeys.flatMap(itemGroupKey => itemGroups[itemGroupKey]);
    }

    //Map items to a position based on item group to terrain label
    let itemGroups = getItemGroups(selectedItems);
    let positionedItems = mapAvailablePositions(itemGroups, selectedLayout);

    //Check if any items didn't find a group to add to
    let unpositionedItems = getItemsNotPositioned(itemGroups, selectedLayout);
    if (unpositionedItems.length > 0) console.log('Unpositioned Items: ', unpositionedItems);

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