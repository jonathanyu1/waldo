import React from 'react';

const HeaderChar = (props) => {

    return (
        <div 
            className='headerCharContainer' 
            style={(props.isFound ? {opacity: 0.5}:null)}
        >
            <div className='headerCharImg'>
                {props.name && <img src={require(`../Images/Header/${props.name}Header.png`).default} alt={`${props.name} header`}/>}
            </div>
            <div className='headerCharName'>
                {props.name}
            </div>
        </div>
    )

}

export default HeaderChar;