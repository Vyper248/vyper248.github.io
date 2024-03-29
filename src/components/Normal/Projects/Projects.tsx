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

const checkFilters = (project: Project, filters: string[]) => {
    if (filters.length === 0) return true;

    let alwaysUsed = new Set(['JavaScript', 'HTML5', 'CSS3']);

    let projectSkills = new Set(project.skills);
    let filterCheck = true;

    for (let i = 0; i < filters.length; i++) {
        let filter = filters[i];

        //no point adding these to every project, so just ignore
        if (alwaysUsed.has(filter)) continue;
        
        if (!projectSkills.has(filter)) {
            filterCheck = false;
            break;
        } 
    }

    return filterCheck;
}

const Projects = ({ projects, filters }: ProjectsProps) => {
    const style = useAppSelector(state => state.setup.style);

    const [open, setOpen] = useState(true);

    const groups = getGroups(projects) as {[key: string]: Project[]};

    return (
        <StyledProjects>
            <Heading heading='Projects' collapsible={true} collapsed={!open} onClick={() => setOpen(!open)}/>
            <CollapsibleContent open={open} instant={true}>
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

                        const filteredProjects = groupProjects.filter(project => checkFilters(project, filters));

                        if (filteredProjects.length === 0) return null;
                        
                        return <ProjectGroup key={groupName} projects={filteredProjects} heading={groupName}/>;
                    })
                }
            </CollapsibleContent>
        </StyledProjects>
    );
}

export default Projects;