import React, { Component } from 'react';

class Login extends Component{

    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    typeHandle = (event)=>{
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    submitLogin = (event)=>{
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render(){
        return(
            <div>
                <div className="col s0 m3"></div>
                <div className="col s12 m6">
                    <div className="card">
                        <form onSubmit={this.submitLogin} >
                            <div className="card-content" >
                                <p style={this.props.error ? {color: "red", display: "block"} : {display: "none"}} >Invalid credentials</p>
                                <div className="input-field">
                                    <input id="username" type="text" required minLength="4" maxLength="12" className="validate" value={this.state.username} onChange={this.typeHandle} />
                                    <label htmlFor="username">Username</label>
                                    <span className="helper-text" data-error="Username must be between 4 and 12 characters" />
                                </div>
                                <div className="input-field">
                                    <input id="password" type="password" required minLength="7" maxLength="20" className="validate" value={this.state.password} onChange={this.typeHandle} />
                                    <label htmlFor="password">Password</label>
                                    <span className="helper-text" data-error="Password must be between 7 and 20 characters" />
                                </div>
                            </div>
                            <div className="card-action">
                                <button className="waves-effect waves-light btn" style={{minWidth: 60 + "%"}} type="submit" >Log In</button>
                            </div>
                        </form>
                    </div>
                    <div className="card">
                        <div className="card-content" >
                            <p>Not a member? Click the button below to register.</p>
                        </div>
                        <div className="card-action">
                            <button className="waves-effect waves-light btn modal-trigger" style={{minWidth: 60 + "%"}} href="#registeruser" >Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;