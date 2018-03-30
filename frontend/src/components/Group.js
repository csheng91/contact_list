import React from 'react';
import Contact from './Contact';

function Group(props){
    let eachContact = props.contacts.map((curr)=>{
        return <Contact thisContact={curr} editClick={props.editClick} delContact={props.delContact} />
    });
    return(
        <div>
            <ul className="collapsible">
                {eachContact}
            </ul>
        </div>
    )
}

export default Group;