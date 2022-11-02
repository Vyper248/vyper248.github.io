import StyledHeader from './Header.style';

import Github from '../../../svgs/github.svg';

const Header = () => {
    return (
        <StyledHeader>
            <div className='container'>
                <h1>Chris Wilson</h1>
                <div id='links'>
                    <div>Email: <a href='mailto:vyper374@hotmail.com'>vyper374@hotmail.com</a></div>
                    <div className='gap'></div>
                    <div><a href='https://github.com/Vyper248' target='_blank'><img src={Github}/></a></div>
                </div>
            </div>
        </StyledHeader>
    );
}

export default Header;