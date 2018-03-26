import React from 'react';
import Contact from './Contact';

function Group(props){
    return(
        <div>
            <ul className="collapsible">
                <Contact />
                <Contact />
            </ul>
        </div>
    )
}

export default Group;