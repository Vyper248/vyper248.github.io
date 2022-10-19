import StyledItem from './Item.style';

export type ItemProps = {
    x: number;
    y: number;
    offset: number;
    svg: string;
    name: string;
    url: string;
    description: string;
    width: number;
}

const Item = ({svg, ...rest}: ItemProps) => {
    return (
        <StyledItem {...rest}><img src={require(`../../svgs/${svg}`)}/></StyledItem>
    );
}

export default Item;