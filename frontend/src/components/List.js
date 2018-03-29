import React, { Component } from 'react';
import Group from './Group';
import GroupHeader from './GroupHeader';

class List extends Component{
    render(){
        let contactGroups = this.props.contacts.reduce((accu, curr)=>{
            if (accu[curr.firstName.charAt(0).toUpperCase]){
                accu[curr.firstName.charAt(0).toUpperCase].push(curr);
            }else{
                accu[curr.firstName.charAt(0).toUpperCase] = [curr];
            }
            return accu;
        }, {});
        console.log(contactGroups);
        return(
            <div className="col s12" >
                <GroupHeader />
                <hr />
                <Group />
            </div>
        )
    }
}

export default List;