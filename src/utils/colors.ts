export const darkenHex = (hex: string) => {
    const values = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    return hex.split('').map(val => {
        let index = values.indexOf(val);
        if (index <= 0) return val;
        if (index === 1) return values[index-1];
        return values[index-2];
    }).join('');
}

export const updateStyle = (style: 'dark' | 'light') => {
    const root = document.documentElement;
    if (style === 'dark') {
        root.style.setProperty('--background-color', 'black');
        root.style.setProperty('--text-color', 'white');
        root.style.setProperty('--border-color', 'lightgray');
        root.style.setProperty('--project-color', '#333');
        root.style.setProperty('--project-color-hover', '#555');
        root.style.setProperty('--header-color', '#777');
    } else {
        root.style.setProperty('--background-color', 'white');
        root.style.setProperty('--text-color', 'black');
        root.style.setProperty('--border-color', 'lightgray');
        root.style.setProperty('--project-color', '#DEF');
        root.style.setProperty('--project-color-hover', '#CDF');
        root.style.setProperty('--header-color', '#DEF');
    }
}