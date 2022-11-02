import { useEffect } from 'react';

import StyledGameControls from './GameControls.style';
import { BsTriangleFill } from 'react-icons/bs';
import { useState } from 'react';

const CloseLeaveControls = ({closed}: {closed: boolean}) => {
    return (
        <>
            <div>
                <div>
                    {closed ? 'C' : 'Esc' }
                </div>
            </div>
            <div className='span2'>
                <span>
                    {closed ? 'Show Controls' : 'Leave Planet'}
                </span>
            </div>
        </>
    );
}

const CloseLeaveControlsSpace = ({closed}: {closed: boolean}) => {
    return (
        <>
            <div>
                <div>
                    {closed ? 'C' : 'Esc' }
                </div>
            </div>
            <div className='span2'>
                <span>
                    {closed ? 'Show Controls' : 'Exit Game'}
                </span>
            </div>
        </>
    );
}

const EnterControls = () => {
    return (
        <>
            <div>
                <div>
                    Enter
                </div>
            </div>
            <div className='span2'>
                <span>
                    Visit Project <br/> (In new tab)
                </span>
            </div>
        </>
    );
}

const InfoControls = () => {
    return (
        <>
            <div>
                <div>
                    i
                </div>
            </div>
            <div className='span2'>
                <span>
                    Project Info
                </span>
            </div>
        </>
    );
}

const MoveControls = () => {
    return (
        <>
            <div></div>
            <div>
                <div>
                    <BsTriangleFill style={{rotate: '0deg'}}/>
                </div>
            </div>
            <div></div>
            
            <div><div><BsTriangleFill style={{rotate: '-90deg'}}/></div></div>
            <div><div><BsTriangleFill style={{rotate: '-180deg'}}/></div></div>
            <div><div><BsTriangleFill style={{rotate: '90deg'}}/></div></div>
        </>
    );
}

const GameControls = ({layout}: {layout: string}) => {
    const [closed, setClosed] = useState(true);

    const onToggle = () => {
        setClosed(closed => !closed);
    }

    useEffect(() => {
        const keyUpListener = (e: KeyboardEvent) => {
            if (e.code === 'KeyC') {
                setClosed(closed => !closed);
            }
        }

        window.addEventListener('keyup', keyUpListener);

        return () => {
            window.removeEventListener('keyup', keyUpListener);
        }
    }, []);

    if (layout === 'Skills') {
        return (
            <StyledGameControls height='150px' onClick={onToggle} closed={closed}>
                <CloseLeaveControls closed={closed}/>
                <MoveControls/>
            </StyledGameControls>
        );
    }

    if (layout === 'Space') {
        return (
            <StyledGameControls height='150px' onClick={onToggle} closed={closed}>
                <CloseLeaveControlsSpace closed={closed}/>
                <MoveControls/>
            </StyledGameControls>
        );
    }

    return (
        <StyledGameControls height='250px' onClick={onToggle} closed={closed}>
            <CloseLeaveControls closed={closed}/>
            <EnterControls/>
            <InfoControls/>
            <MoveControls/>
        </StyledGameControls>
    );
}

export default GameControls;