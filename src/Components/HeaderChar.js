import React, {useEffect} from 'react';

const HeaderChar = (props) => {

    useEffect(()=>{
        console.log(props.isFound);
    },[])

    return (
        <div className='headerCharContainer'>
            <div className='headerCharImg'>
                {props.name && <img src={require(`../Images/Header/${props.name}Header.png`).default}/>}
            </div>
            <div className='headerCharName'>
                {props.name}
            </div>
        </div>
    )

}

export default HeaderChar;