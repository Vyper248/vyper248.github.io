import Label from '../Label/Label';
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
    group: string;
}

const Item = ({svg, ...rest}: ItemProps) => {
    return (
        <>
            <StyledItem {...rest}>
                <img src={require(`../../svgs/${svg}`)}/>
            </StyledItem>
            <Label x={rest.x + rest.width/2} y={rest.y} label={rest.name} fromBottom={true}/>
        </>
    );
}

export default Item;