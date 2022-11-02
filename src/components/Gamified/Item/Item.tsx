import Label from '../Label/Label';
import StyledItem from './Item.style';

export type ItemProps = {
    x: number;
    y: number;
    offset: number;
    offsetX?: number;
    svg: string;
    name: string;
    url: string;
    description: string;
    width: number;
    group: string;
}

const Item = ({svg, ...rest}: ItemProps) => {
    let offsetX = rest.offsetX || 0;
    return (
        <>
            <StyledItem {...rest}>
                <img src={require(`../../../svgs/${svg}`)}/>
            </StyledItem>
            <Label x={rest.x + rest.width/2 + offsetX} y={rest.y} label={rest.name} fromBottom={true}/>
        </>
    );
}

export default Item;