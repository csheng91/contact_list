import React, {Component} from 'react';

class Contact extends Component{

    componentDidMount(){
        window.M.AutoInit();        
    }

    render(){
        let feedData = ()=>{
            this.props.editClick(this.props.thisContact._id, this.props.thisContact.firstName, this.props.thisContact.lastName, this.props.thisContact.phone, this.props.thisContact.email);
        }
        return(
            <li>
                <div className="collapsible-header" >{this.props.thisContact.firstName + " " + this.props.thisContact.lastName}</div>
                <div className="collapsible-body left-align" >
                    <p><b>Phone: </b> {this.props.thisContact.phone}</p>
                    <p><b>Email: </b> {this.props.thisContact.email}</p>
                    <hr />
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}} >
                        <button className="btn-floating waves-effect waves-light grey darken-3 modal-trigger" style={{marginRight: 8}} onClick={feedData} href="#editContact" ><i className="material-icons">edit</i></button>
                        <button className="btn-floating waves-effect waves-light grey darken-3" onClick={()=>this.props.delContact(this.props.thisContact._id)} ><i className="material-icons">delete</i></button>
                    </div>            
                </div>
            </li>
        )
    }
}

export default Contact;