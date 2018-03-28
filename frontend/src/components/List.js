import React, { Component } from 'react';
import Group from './Group';
import GroupHeader from './GroupHeader';

class List extends Component{
    render(){
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