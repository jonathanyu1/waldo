import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import StartPage from './Components/StartPage';
import characterFactory from './Factories/characterFactory';
import GameController from './Components/GameController';
import firebase, {firestore} from './Firebase/firebase.js';
import has from 'lodash'



const App = () => {
    const [gameStart, setGameStart] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [gameCharNames, setGameCharNames] = useState(['waldo','odlaw','wizard']);
    const [gameChars, setGameChars] = useState([]);
    const [dataId, setDataId] = useState('');

    const beginGame = () => {
        setGameStart(true);
    }

    const checkGameEnd = () =>{
      // let counter = 0;
      // for (let i=0;i<gameChars.length;i++){
      //   console.log(gameChars[i].name);
      //   console.log(gameChars[i].isFound());
      //     if (gameChars[i].isFound()){
      //         counter++;
      //     } else {
      //         return;
      //     }
      // }
      // if (counter===gameChars.length && gameChars.length>0){
      //   console.log('game end');
      //   setGameEnd(true);
      // }
        let checkFound = gameChars.every(function(gameChar){
            return gameChar.isFound();
        });
        if (checkFound){
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

    const addTimestampToFirestore = () =>{
        return firebase.firestore().collection('newGame').add({
            startTime: firebase.firestore.FieldValue.serverTimestamp()
        }).then((data)=>{
            console.log(data);
            console.log(data.id);
            setDataId(data.id);
        }).catch(function(error) {
            console.log('Error writing new message to database', error);
        });
    }

    const addEndTimestampToFirestore = () => {
      return firebase.firestore()
            .collection('newGame')
            .doc(`${dataId}`)
            .update({
                endTime: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(function(error){
                console.log('Error writing new message to database', error);
            });
    }

    useEffect(()=>{
        generateGameChars();
    },[]);

    useEffect(()=>{
        console.log('gameStart: ',gameStart);
        if (gameStart){
            addTimestampToFirestore();
        }
    },[gameStart]);


    useEffect(()=>{
        console.log(gameChars);
        if (gameStart){
          checkGameEnd();
        }
    },[gameChars]);

    useEffect(()=>{
        if (gameEnd){
            addEndTimestampToFirestore();
        }
    },[gameEnd]);

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
