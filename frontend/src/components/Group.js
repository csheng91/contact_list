import React, { Component } from 'react';
import Contact from './Contact';

// this should really be a functional component
// but for some reason the collapsible breaks on those
class Group extends Component{
    render(){
        let eachContact = this.props.contacts.map((curr)=>{
            return <Contact thisContact={curr} />
        });
        return(
            <div>
                <ul className="collapsible">
                    {eachContact}
                </ul>
            </div>
        )
    }
}

export default Group;