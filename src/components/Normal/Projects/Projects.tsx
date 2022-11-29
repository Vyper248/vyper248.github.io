import { useState } from 'react';
import StyledProjects from './Projects.style';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { getGroups } from '../../../utils/utils';
import { useAppSelector } from '../../../redux/hooks';

import { ProjectProps as Project } from '../Project/Project';

import Heading from '../Heading/Heading';
import ProjectGroup from '../ProjectGroup/ProjectGroup';
import CollapsibleContent from '../CollapsibleContent/CollapsibleContent';

type ProjectsProps = {
    projects: Project[];
    filters: string[];
}

const Projects = ({ projects, filters }: ProjectsProps) => {
    const style = useAppSelector(state => state.setup.style);

    const [open, setOpen] = useState(true);

    const groups = getGroups(projects) as {[key: string]: Project[]};

    return (
        <StyledProjects>
            <Heading heading='Projects' collapsible={true} collapsed={!open} onClick={() => setOpen(!open)}/>
            <CollapsibleContent open={open}>
                { 
                    filters.length > 0 ?
                        <div id='filters'>
                            <CodeMirror value={`const Filter_List = ['${filters.join('\', \'')}'];`} extensions={[javascript({ jsx: true })]}
                                theme={style === 'light' ? 'light' : 'dark'}
                                editable={false}
                                basicSetup={{
                                    lineNumbers: false,
                                    foldGutter: false,
                                    highlightActiveLine: false,
                                }}/>
                        </div> : null 
                }
                {
                    Object.keys(groups).map((groupName: string) => {
                        let groupProjects = groups[groupName];
                        return (
                            <div key={groupName} className='group'>
                                <h3>{groupName}</h3>
                                <ProjectGroup projects={groupProjects} filters={filters}/>
                            </div>
                        );
                    })
                }
            </CollapsibleContent>
        </StyledProjects>
    );
}

export default Projects;