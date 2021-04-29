import React from 'react';

const GameController = (props) => {

    return (
        <div id='gameContainer'>
            <img className='gameImage' src={require(`../Images/Game/waldoGame.jpg`).default}/>
        </div>
    )
}

export default GameController;
