import StyledLabel from './Label.style';

type LabelProps = {
    x: number;
    y: number;
    label: string;
}

const Label = ({x, y, label}: LabelProps) => {
    return (
        <StyledLabel x={x} y={y}>
            { label }
        </StyledLabel>
    );
}

export default Label;