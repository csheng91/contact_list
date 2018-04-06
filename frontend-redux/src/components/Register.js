import React, { Component } from 'react';

class Register extends Component{

    constructor(){
        super();
        this.state = {
            newUsername: "",
            newPassword: ""
        }
    }

    typeHandle = (event)=>{
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    submitRegister = (event)=>{
        event.preventDefault();
        console.log(event);
        // event.preventDefault();
        // this.props.register(this.state.newUsername, this.state.newPassword, this.registerModal);
    }

    render(){
        return(
            <div id="registeruser" className="modal" ref={input=>{this.registerModal = input}} >
                <form onSubmit={this.submitRegister} >
                    <div className="modal-content">
                        <p style={this.props.regError ? {color: "red", display: "block"} : {display: "none"}} >This username is already taken</p>
                        <div className="input-field">
                            <input id="newUsername" type="text" required minLength="4" maxLength="12" className="validate" value={this.state.newUsername} onChange={this.typeHandle} />
                            <label for="newUsername">Username</label>
                            <span className="helper-text" data-error="Username must be between 4 and 12 characters" />
                        </div>
                        <div className="input-field">
                            <input id="newPassword" type="password" required minLength="7" maxLength="20" className="validate" value={this.state.newPassword} onChange={this.typeHandle} />
                            <label for="newPassword">Password</label>
                            <span className="helper-text" data-error="Password must be between 7 and 20 characters" />
                        </div>
                        <div className="input-field">
                            <input id="repPassword" type="password" required pattern={this.state.newPassword} className="validate" />
                            <label for="repPassword">Re-enter Password</label>
                            <span className="helper-text" data-error="Password must match above" />
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

export default Register;