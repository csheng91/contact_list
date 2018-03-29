import React, { Component } from 'react';
import Group from './Group';
import GroupHeader from './GroupHeader';

class List extends Component{
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
                    <Group contacts={contactGroups[firstLetter]} />
                </div>
            );
        }
        return(
            <div>
                {allContacts}
            </div>
        )
    }
}

export default List;