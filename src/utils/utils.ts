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