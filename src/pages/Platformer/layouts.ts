const planetInstructions = 
`Right Arrow: Move Right
Left Arrow: Move Left
Up Arrow or Space: Jetpack
Escape: Leave planet
Enter: Visit building
(opens in new tab)`;

let projectY = 0;

export const projectsLayout = [
    {
        x: 150,
        y: projectY+=300,
        width: 1080,
        height: 40,
        label: 'Latest'
    },
    {
        x: 750,
        y: projectY+=300,
        width: 900,
        height: 40,
        label: ''
    },
    {
        x: 50,
        y: projectY+=300,
        width: 1400,
        height: 40,
        label: 'Old Projects'
    },
    {
        x: 550,
        y: projectY+=300,
        width: 1230,
        height: 40,
        label: 'Old Projects Cont.'
    },
    { //Bottom
        x: 0,
        y: 0,
        width: 2600,
        height: 50,
        label: planetInstructions
    },
];

export const skillsLayout = [
    {
        x: 850,
        y: 150,
        width: 600,
        height: 40,
        label: ''
    },
    {
        x: 150,
        y: 300,
        width: 600,
        height: 40,
        label: ''
    },
    {
        x: 550,
        y: 500,
        width: 800,
        height: 40,
        label: ''
    },
    {
        x: 150,
        y: 700,
        width: 500,
        height: 40,
        label: ''
    },
    {
        x: 750,
        y: 800,
        width: 500,
        height: 40,
        label: ''
    },
    { //Bottom
        x: 0,
        y: 0,
        width: 2600,
        height: 50,
        label: ''
    },
];