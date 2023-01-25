import { useState } from 'react';
import StyledAbout from './About.style';
import { useAppSelector } from '../../../redux/hooks';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { aboutMe } from '../../../dataFiles/aboutMe';

import CollapsibleContent from '../CollapsibleContent/CollapsibleContent';
import Heading from '../Heading/Heading';

const About = () => {
    const style = useAppSelector(state => state.setup.style);
    const [about, setAbout] = useState(aboutMe);
    const [open, setOpen] = useState(true);

    const [image, setImage] = useState('outdoorsImage1.jpeg');

    const onChangeAbout = (code: string) => {
        setAbout(code);
        if (code.includes('images[0]')) setImage('outdoorsImage1.jpeg');
        if (code.includes('images[1]')) setImage('outdoorsImage2.jpeg');
        if (code.includes('images[2]')) setImage('catPhoto.jpeg');
    }

    return (
        <>
            <Heading heading='About' collapsible={true} collapsed={!open} onClick={() => setOpen(!open)}/>
            <CollapsibleContent open={open}>
                <StyledAbout>
                    <div id='myImage'><img alt='Myself' src={require(`../../../profileImages/${image}`)}/></div>
                    <div id='aboutMe'>
                        <CodeMirror
                            value={about}
                            extensions={[javascript({ jsx: true })]}
                            theme={style === 'light' ? 'light' : 'dark'}
                            basicSetup={{
                                lineNumbers: false,
                                foldGutter: false,
                                highlightActiveLine: false
                            }}
                            onChange={onChangeAbout}
                        />
                    </div>
                </StyledAbout>
            </CollapsibleContent>
        </>
    );
}

export default About;