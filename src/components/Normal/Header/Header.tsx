import StyledHeader from './Header.style';

import Github from '../../../svgs/github.svg';
import Email from '../../../svgs/email.svg';

import Svg from '../Svg/Svg';

const Header = () => {
    return (
        <StyledHeader>
            <div className='container'>
                <h1>Chris Wilson</h1>
                <div id='links'>
                    <div></div>
                    <div className='gap'></div>
                    <div><a href='mailto:vyper374@hotmail.com' target='_blank'><Svg src={Email}/></a></div>
                    <div><a href='https://github.com/Vyper248' target='_blank'><Svg src={Github}/></a></div>
                </div>
            </div>
        </StyledHeader>
    );
}

export default Header;