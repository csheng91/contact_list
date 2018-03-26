import React, { Component } from 'react';
import Group from './Group';
import GroupHeader from './GroupHeader';

class List extends Component{
    render(){
        return(
            <div>
                <GroupHeader />
                <hr />
                <Group />
            </div>
        )
    }
}

export default List;