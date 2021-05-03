import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import StartPage from './Components/StartPage';
import characterFactory from './Factories/characterFactory';
import GameController from './Components/GameController';
import has from 'lodash'



const App = () => {
    const [gameStart, setGameStart] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [gameCharNames, setGameCharNames] = useState(['waldo','odlaw','wizard']);
    const [gameChars, setGameChars] = useState([]);

    const beginGame = () => {
        setGameStart(true);
    }

    const checkGameEnd = () =>{
      let counter = 0;
      for (let i=0;i<gameChars.length;i++){
        console.log(gameChars[i].name);
        console.log(gameChars[i].isFound());
          if (gameChars[i].isFound()){
              counter++;
          } else {
              return;
          }
      }
      if (counter===gameChars.length && gameChars.length>0){
        console.log('game end');
        setGameEnd(true);
      }
    }

    const generateGameChars = () =>{
        let tempGameChars = [];
        gameCharNames.forEach((charName)=>{
            tempGameChars.push(characterFactory(charName));
        });
        setGameChars((tempGameChars));
    }

    const updateGameCharsFound = (charName) => {
        const  _ = require('lodash');
        let tempGameChars = _.cloneDeep(gameChars);
        console.log(tempGameChars);
        tempGameChars.forEach((gameChar)=>{
           console.log(gameChar);
           console.log(gameChar.name);
           if (gameChar.name === charName){
              gameChar.setFoundStatus(true);
           }
        });
        setGameChars(tempGameChars);
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
        checkGameEnd();
    },[gameChars]);

    return (
      <div id="appContainer">
        <Header 
          gameChars={gameChars}
          gameStart={gameStart}
          gameEnd={gameEnd}
        />
        {gameStart ? null : <StartPage beginGame={beginGame}/>}
        {gameStart ? <GameController 
                        gameChars={gameChars}
                        updateGameCharsFound={updateGameCharsFound}
                    /> 
        : null}
      </div>
    );
}

export default App;
