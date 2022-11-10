import StyledSvg from './Svg.style';

type SvgProps = {
    src: string;
    color?: string;
}

const Svg = ({src, color}: SvgProps) => {
    return (
        <StyledSvg src={src} color={color}>
            <img src={src}/>
        </StyledSvg>
    );
}

export default Svg;