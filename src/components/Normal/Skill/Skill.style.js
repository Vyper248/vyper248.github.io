import styled from 'styled-components';

import StyledProject from '../Project/Project.style';

const StyledSkill = styled(StyledProject)`
    height: 50px;

    ${props => props.selected ? 'background-color: var(--project-color-hover);' : ''}
`

export default StyledSkill;