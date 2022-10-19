import StyledLabel from './Label.style';

type LabelProps = {
    x: number;
    y: number;
    label: string;
    fromBottom?: boolean;
}

const Label = ({x, y, label, fromBottom=false}: LabelProps) => {
    return (
        <StyledLabel x={x} y={y} fromBottom={fromBottom}>
            { label }
        </StyledLabel>
    );
}

export default Label;