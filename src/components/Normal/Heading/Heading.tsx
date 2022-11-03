import StyledHeading from './Heading.style';

const Heading = ({heading}: {heading: string}) => {
    return (
        <StyledHeading>
            { heading }
        </StyledHeading>
    );
}

export default Heading;