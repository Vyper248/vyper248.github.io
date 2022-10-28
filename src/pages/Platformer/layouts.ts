const planetInstructions = 
`Right Arrow: Move Right
Left Arrow: Move Left
Up Arrow or Space: Jetpack
Escape: Leave planet
i: Project Information
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
        x: 650,
        y: projectY+=300,
        width: 900,
        height: 40,
        label: 'Old Projects'
    },
    {
        x: 50,
        y: projectY+=300,
        width: 1400,
        height: 40,
        label: 'Very Old Projects'
    },
    {
        x: 350,
        y: projectY+=300,
        width: 1230,
        height: 40,
        label: 'Experiments'
    },
    { //Bottom
        x: 0,
        y: 0,
        width: 2600,
        height: 50,
        label: ''
    },
];

projectY = 0;

export const skillsLayout = [
    {
        x: 450,
        y: projectY+=300,
        width: 600,
        height: 40,
        label: 'Experienced'
    },
    {
        x: 150,
        y: projectY+=300,
        width: 600,
        height: 40,
        label: 'Learning'
    },
    {
        x: 550,
        y: projectY+=300,
        width: 800,
        height: 40,
        label: 'Older Skills'
    },
    { //Bottom
        x: 0,
        y: 0,
        width: 2600,
        height: 50,
        label: ''
    },
];