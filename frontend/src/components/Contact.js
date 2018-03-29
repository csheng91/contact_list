import React, { Component } from 'react';

class Contact extends Component{
    render(){
        return(
            <li>
                <div className="collapsible-header" >{this.props.thisContact.firstName + " " + this.props.thisContact.lastName}</div>
                <div className="collapsible-body left-align" >
                    <p><b>Phone: </b> {this.props.thisContact.phone}</p>
                    <p><b>Email: </b> {this.props.thisContact.email}</p>
                </div>
            </li>
        )
    }
}

export default Contact;