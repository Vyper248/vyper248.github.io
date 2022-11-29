type Group = {
    name: string;
    group: string;   
}

export const getGroups = (projects: Group[]) => {
    if (!projects) return {};

    return projects.reduce((a: {[key: string]: Group[]}, c) => {
        if (a[c.group] === undefined) a[c.group] = [];
        a[c.group].push(c);
        return a;
    }, {});
}

const points: {[key: string] : [number, number][]} = {
    a: [],
    b: [],
    c: [[5,7], [4,7], [3,7], [2,7], [1,7], [1,6], [1,5], [1,4], [1,3], [1,2], [1,1], [1,2], [1,3], [1,4], [1,5]],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [[1,7], [1,6], [1,5], [1,4], [1,3], [1,2], [1,1], [2,4], [3,4], [4,4], [5,7], [5,6], [5,5], [5,4], [5,3], [5,2], [5,1]],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: []
}

export const getPoints = (text: string) => {
    let pointArray: [number, number][] = [];

    text.split('').forEach(letter => {
        let arr = points[letter];
        pointArray.push(...arr);
    });

    return pointArray;
}