import React, {useEffect,useState} from 'react';
import HeaderChar from './HeaderChar';
import Timer from './Timer';

const Header = (props) => {
    const {gameChars, gameStart, gameEnd} = props;

    return (
        <div id='headerContainer'>
            <div id='headerCharsContainer'>
                {gameChars.map(gameChar => {
                    return (
                        <HeaderChar
                            key={gameChar.name}
                            name={gameChar.name}
                            isFound={gameChar.isFound()}
                        />
                    )
                })}
            </div>
            {gameStart ? <Timer gameEnd={gameEnd}/> : null}
        </div>
    )

}

export default Header;