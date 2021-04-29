import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

const GameController = (props) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleClick = () => {
        console.log('clicked on game image');
        setDropdownVisible(!dropdownVisible);
    }

    useEffect(()=>{
        console.log('dropdownVisible:',dropdownVisible);
    },[dropdownVisible]);

    useEffect(()=>{
        console.log(props.gameChars);
    },[]);

    return (
        <div id='gameContainer'>
            <img 
                className='gameImage' 
                src={require(`../Images/Game/waldoGame.jpg`).default}
                onClick={handleClick}
            />
            {dropdownVisible && <Dropdown />}
        </div>
    )
}

export default GameController;
