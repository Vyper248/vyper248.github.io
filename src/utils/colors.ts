export const darkenHex = (hex: string) => {
    const values = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    return hex.split('').map(val => {
        let index = values.indexOf(val);
        if (index <= 0) return val;
        if (index === 1) return values[index-1];
        return values[index-2];
    }).join('');
}