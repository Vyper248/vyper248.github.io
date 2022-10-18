import Person from '../../components/Person/Person';
import Terrain from '../../components/Terrain/Terrain';

export type BlockStyle = {
    groundColor: string;
    skyColor: string;
}

type PlatformerProps = {
    blockStyle: BlockStyle;
    planetName: string;
}

const projectsLayout = [
    {
        x: 150,
        y: 300,
        width: 600,
        height: 40,
        collideSides: false
    },
    {
        x: 750,
        y: 500,
        width: 600,
        height: 40,
        collideSides: false
    },
    {
        x: 50,
        y: 700,
        width: 1000,
        height: 40,
        collideSides: false
    },
    { //Bottom
        x: 0,
        y: 900,
        width: 1600,
        height: 100,
        collideSides: false
    },
];

const Platformer = ({blockStyle, planetName}: PlatformerProps) => {
    let selectedLayout = projectsLayout;

    if (planetName !== 'Projects') {
        //change to different layout
    }

    return (
        <div>
            <Terrain layout={selectedLayout} blockStyle={blockStyle}/>
            <Person blocks={selectedLayout}/>
        </div>
    );
}

export default Platformer;