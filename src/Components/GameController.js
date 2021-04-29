import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

const GameController = (props) => {
    const {gameChars} = props;
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [clickCoords, setClickCoords] = useState({x:0,y:0});

    const updateClickCoords = (e) => {
        console.log(e);
        setClickCoords({x:e.pageX,y:e.pageY});
    }

    const handleClick = (e) => {
        console.log(e);
        console.log('clicked on game image');
        setDropdownVisible(!dropdownVisible);
        updateClickCoords(e);
    }

    useEffect(()=>{
        console.log(clickCoords);
    },[clickCoords]);

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
            {dropdownVisible && <Dropdown 
                                    gameChars={gameChars.filter(gameChar => !gameChar.isFound())}
                                    clickCoords={clickCoords}
                                />
            }
        </div>
    )
}

export default GameController;
