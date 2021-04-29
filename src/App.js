import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import StartPage from './Components/StartPage';
import characterFactory from './Factories/characterFactory';
import GameController from './Components/GameController';

const App = () => {
    const [gameStart, setGameStart] = useState(false);
    const [gameCharNames, setGameCharNames] = useState(['waldo','odlaw','wizard']);
    const [gameChars, setGameChars] = useState([]);

    const beginGame = () => {
      setGameStart(true);
    }

    const generateGameChars = () =>{
        let tempGameChars = [];
        gameCharNames.forEach((charName)=>{
            tempGameChars.push(characterFactory(charName));
        });
        setGameChars((tempGameChars));
    }

    useEffect(()=>{
      console.log('gameStart: ',gameStart);
    },[gameStart])

    useEffect(()=>{
      generateGameChars();
    },[]);

    useEffect(()=>{
      console.log(gameChars);
      // console.log(gameChars[0].isFound());
    },[gameChars]);


    return (
      <div id="appContainer">
        <Header gameChars={gameChars}/>
        {gameStart ? null : <StartPage beginGame={beginGame}/>}
        {gameStart ? <GameController 
                        gameChars={gameChars}
                    /> 
        : null}
      </div>
    );
}

export default App;
