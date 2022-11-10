import StyledHeading from './Heading.style';

const Heading = ({heading}: {heading: string}) => {
    return (
        <StyledHeading id={heading}>
            { heading }
        </StyledHeading>
    );
}

export default Heading;