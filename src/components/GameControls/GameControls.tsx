import StyledGameControls from './GameControls.style';
import { BsTriangleFill } from 'react-icons/bs';

const GameControls = () => {
    return (
        <StyledGameControls>
            <div>
                <div>
                    Esc
                </div>
            </div>
            <div className='span2'>
                <span>
                    Leave Planet
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