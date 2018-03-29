import React from 'react';

function GroupHeader(props){
    return(
        <p className="left-align" style={{color: 'gray', paddingLeft: 10, marginBottom: 0}}>{props.firstLetter}</p>
    )
}

export default GroupHeader;