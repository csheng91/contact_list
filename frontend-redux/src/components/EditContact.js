import React, { Component } from 'react';

class EditContact extends Component{

    submitContact = (event)=>{
        event.preventDefault();
        this.props.editContact(this.props.editId, this.props.editFirst, this.props.editLast, this.props.editPhone, this.props.editEmail, this.editModal, this.props.resetState);
    }

    render(){
        return(
            <div id="editContact" className="modal" ref={input=>{this.editModal = input}} >
                <form onSubmit={this.submitContact} >
                    <div className="modal-content">
                        <p style={this.props.editError ? {color: "red", display: "block"} : {display: "none"}} >Contact must have a first or last name</p>
                        <div className="input-field col s6">
                            <input id="editFirst" type="text" className="validate" placeholder={this.props.editFirst} value={this.props.editFirst} onChange={this.props.typeHandle} />
                            <label htmlFor="editFirst">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="editLast" type="text" className="validate" placeholder={this.props.editLast} value={this.props.editLast} onChange={this.props.typeHandle} />
                            <label htmlFor="editLast">Last Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="editEmail" type="email" className="validate" placeholder={this.props.editEmail} value={this.props.editEmail} onChange={this.props.typeHandle} />
                            <label htmlFor="editEmail">Email Address</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="editPhone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="validate" placeholder={this.props.editPhone} value={this.props.editPhone} onChange={this.props.typeHandle} />
                            <label htmlFor="editPhone">Phone Number</label>
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

export default EditContact;