import { ReactNode, useRef, useEffect, useState } from 'react';

import { useAppSelector } from '../../../redux/hooks';

import StyledCollapsibleContent from './CollapsibleContent.style';

type CollapsibleContentProps = {
    open: boolean;
    children: ReactNode;
}

const CollapsibleContent = ({ open, children }: CollapsibleContentProps) => {
    const displayMode = useAppSelector(state => state.setup.displayMode);
    const groupRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (groupRef) {
            let div = groupRef.current;
            if (!div) return;

            let count = 0;
            let interval = setInterval(() => {
                if (groupRef.current) {
                    let divHeight = groupRef.current.clientHeight + 20;
                    setHeight(divHeight);
                }
                count++;
                if (count >= 40) clearInterval(interval);
            }, 10);

            return () => {
                clearInterval(interval);
            }
        }
    }, [groupRef, displayMode]);

    return (
        <StyledCollapsibleContent open={open} height={height}>
            <div ref={groupRef}>
                { children }
            </div>
        </StyledCollapsibleContent>
    );
}

export default CollapsibleContent;