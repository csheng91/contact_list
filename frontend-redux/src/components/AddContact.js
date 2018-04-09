import React, { Component } from 'react';

class AddContact extends Component{

    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            phone: "",
            email: ""
        }
    }

    typeHandle = (event)=>{
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    submitContact = (event)=>{
        event.preventDefault();
        this.props.newContact(this.state.firstName, this.state.lastName, this.state.phone, this.state.email, this.contactModal);
        this.setState({
            firstName: "",
            lastName: "",
            phone: "",
            email: ""
        })
    }

    render(){
        return(
            <div id="addContact" className="modal" ref={input=>{this.contactModal = input}} >
                <form onSubmit={this.submitContact} >
                    <div className="modal-content">
                        <p style={this.props.error ? {color: "red", display: "block"} : {display: "none"}} >Contact must have a first or last name</p>
                        <div className="input-field col s6">
                            <input id="firstName" type="text" className="validate" value={this.state.firstName} onChange={this.typeHandle} />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="lastName" type="text" className="validate" value={this.state.lastName} onChange={this.typeHandle} />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" value={this.state.email} onChange={this.typeHandle} />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="validate" value={this.state.phone} onChange={this.typeHandle} />
                            <label htmlFor="phone">Phone Number</label>
                            <span className="helper-text" data-error="Please use format: xxx-xxx-xxxx" />
                        </div>
                    </div>
                    <div style={{marginBottom: 30}} >
                        <button className="waves-effect waves-light btn" style={{width: 60 + "%"}} type="submit" >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddContact;