import { useEffect, useState } from 'react';

import { StyledStar } from './Stars.style';

type StarsProps = {
    width: number;
    height: number;
    qty: number;
}

type StarProps = {
    x: number;
    y: number;
}

const Star = ({x, y}: StarProps) => {
    return (
        <StyledStar x={x} y={y}></StyledStar>
    );
}

const Stars = ({width, height, qty}: StarsProps) => {
    const [stars, setStars] = useState([] as JSX.Element[]);

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < qty; i++) {
            let x = Math.random()*width;
            let y = Math.random()*height;
            arr.push(<Star key={x+''+y} x={x} y={y}/>);
        }
        setStars(arr);
    }, [qty]);

    return (
        <div>
            { stars }
        </div>
    );
}

export default Stars;