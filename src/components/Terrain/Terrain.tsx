import StyledTerrain, { StyledBlock } from './Terrain.style';

import { BlockStyle } from '../../pages/Platformer/Platformer';

export type TerrainBlock = {
    x: number;
    y: number;
    width: number;
    height: number;
    collideSides: boolean;
}

type BlockProps = {
    details: TerrainBlock;
    blockStyle: BlockStyle;
}

type TerrainProps = {
    layout: TerrainBlock[];
    blockStyle: BlockStyle;
}

const Block = ({details, blockStyle}: BlockProps) => {
    return (
        <StyledBlock {...details} {...blockStyle}></StyledBlock>
    );
}

const Terrain = ({layout, blockStyle}: TerrainProps) => {
    return (
        <StyledTerrain {...blockStyle}>
        {
            layout.map((obj:TerrainBlock, i: number) => {
                return <Block key={i} details={obj} blockStyle={blockStyle}/>
            })
        }
        </StyledTerrain>
    );
}

export default Terrain;