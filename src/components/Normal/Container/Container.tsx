import { JsxElement } from 'typescript';
import StyledContainer from './Container.style';

const Container = ({children}: {children: React.ReactNode}) => {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    );
}

export default Container;