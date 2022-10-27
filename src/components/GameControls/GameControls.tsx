import { useEffect } from 'react';

import StyledGameControls from './GameControls.style';
import { BsTriangleFill } from 'react-icons/bs';
import { useState } from 'react';

const GameControls = () => {
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

    return (
        <StyledGameControls onClick={onToggle} closed={closed}>
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

            <div>
                <div>
                    Enter
                </div>
            </div>
            <div className='span2'>
                <span>
                    Visit Building <br/> (In new tab)
                </span>
            </div>

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
        </StyledGameControls>
    );
}

export default GameControls;