import StyledHeading from './Heading.style';

type HeadingProps = {
    heading: string;
    collapsible?: boolean;
    collapsed?: boolean;
    onClick?: () => void;
}

const HiddenText = ({collapsed, onClick} : {collapsed: boolean; onClick?: () => void;}) => {
    return (
        <span>
            <span className='faded'> hidden=&#123;</span>
            <span className='collapsed' onClick={onClick}>{collapsed ? 'true' : 'false'}</span>
            <span className='faded'>&#125;</span>
        </span>
    );
}

const Heading = ({heading, collapsible=false, collapsed=false, onClick=()=>{}}: HeadingProps) => {
    return (
        <StyledHeading id={heading}>
            { heading }
            { 
                collapsible ? <HiddenText collapsed={collapsed} onClick={onClick}/> : null
            }
        </StyledHeading>
    );
}

export default Heading;