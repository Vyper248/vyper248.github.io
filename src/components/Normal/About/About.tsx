import { useState } from 'react';
import StyledAbout from './About.style';
import { useAppSelector } from '../../../redux/hooks';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const summary = "I love to create websites, especially if they're useful in some way. "+
"One of the first large websites I created was for a carehome I worked for, which greatly increased productivity on the admin side of things."+
"";

const aboutMe = 
`const Name = 'Chris Wilson';
const Job_Title = 'Web Developer';
let Current_Library = 'React';
const Interests = ['Gaming', 'Programming', 'Exploring', 'Escape Rooms'];

let Summary = "${summary}";

const images = ['outdoorsImage1.jpeg', 'outdoorsImage2.jpeg', 'catPhoto.jpeg']
let selectedImage = images[0];`

const About = () => {
    const style = useAppSelector(state => state.setup.style);
    const [about, setAbout] = useState(aboutMe);

    const [image, setImage] = useState('outdoorsImage1.jpeg');

    const onChangeAbout = (code: string) => {
        setAbout(code);
        if (code.includes('images[0]')) setImage('outdoorsImage1.jpeg');
        if (code.includes('images[1]')) setImage('outdoorsImage2.jpeg');
        if (code.includes('images[2]')) setImage('catPhoto.jpeg');
    }

    return (
        <StyledAbout>
            <div id='myImage'><img src={require(`../../../profileImages/${image}`)}/></div>
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
    );
}

export default About;