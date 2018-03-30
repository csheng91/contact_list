import React, { Component } from 'react';
import Group from './Group';
import GroupHeader from './GroupHeader';
import AddContact from './AddContact';
import EditContact from './EditContact';

class List extends Component{

    constructor(){
        super();
        this.state = {
            editId: "",
            editFirst: "",
            editLast: "",
            editPhone: "",
            editEmail: ""
        };
    }

    // need to reinitiate materialize when DOM changes
    componentDidMount(){
        window.M.AutoInit();        
    }

    typeHandle = (event)=>{
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    editClick = (contactId, first, last, phoneNum, emailAdr)=>{
        console.log(first, last, phoneNum, emailAdr);
        this.setState({
            editId: contactId,
            editFirst: first,
            editLast: last,
            editPhone: phoneNum,
            editEmail: emailAdr
        });
    }

    resetState = ()=>{
        this.setState({
            editId: "",
            editFirst: "",
            editLast: "",
            editPhone: "",
            editEmail: ""
        });
    }

    render(){
        let contactGroups = this.props.contacts
            .sort((a, b)=>{
                if (a.firstName.toUpperCase() < b.firstName.toUpperCase()){
                    return -1;
                }
                if (a.firstName.toUpperCase() > b.firstName.toUpperCase()){
                    return 1;
                }
                return 0;
            })
            .reduce((accu, curr)=>{
                let firstLetter = curr.firstName.charAt(0).toUpperCase();
                if (accu[firstLetter]){
                    accu[firstLetter].push(curr);
                }else{
                    accu[firstLetter] = [curr];
                }
                return accu;
            }, {});

        let allContacts = [];
        for (let firstLetter in contactGroups){
            allContacts.push(
                <div className="col s12" >
                    <GroupHeader firstLetter={firstLetter} />
                    <hr />
                    <Group contacts={contactGroups[firstLetter]} editClick={this.editClick} delContact={this.props.delContact} />
                </div>
            );
        }
        return(
            <div>
                {allContacts}
                <button className="btn-floating btn-large waves-effect waves-light red modal-trigger" style={{position: "fixed", bottom: 50, right: 50}} href="#addContact" ><i className="material-icons">add</i></button>
                <button className="waves-effect waves-light btn red" onClick={this.props.logout} >Logout</button>
                <AddContact newContact={this.props.newContact} newConError={this.props.newConError} />
                <EditContact editId={this.state.editId} editFirst={this.state.editFirst} editLast={this.state.editLast} editPhone={this.state.editPhone} editEmail={this.state.editEmail} typeHandle={this.typeHandle} resetState={this.resetState} editContact={this.props.editContact} editError={this.props.editError} />
            </div>
        )
    }
}

export default List;