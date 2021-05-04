import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import StartPage from './Components/StartPage';
import characterFactory from './Factories/characterFactory';
import GameController from './Components/GameController';
import PostGame from './Components/PostGame';
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

    const getFinalTime = () => {
        let tempFinalTime = null;
        let docRef = firebase.firestore()
                  .collection('newGame')
                  .doc(`${dataId}`);
        tempFinalTime = docRef.get().then((doc)=>{
            if (doc.exists) {
                console.log(doc.data());
                console.log(doc.data().endTime.seconds);
                console.log(doc.data().startTime.seconds);
                console.log(doc.data().endTime.seconds-doc.data().startTime.seconds);
                return doc.data().endTime.seconds-doc.data().startTime.seconds;
            } else {
                console.log('no such document');
                return null;
            }
        }).catch((error)=>{
            console.log('Error getting document:',error);
            return null;
        });
        console.log('hi');
        return tempFinalTime;
    }

    const handleSubmitScore = (userName, time, timeInSecs) => {
        return firebase.firestore().collection('leaderboard').add({
            name: userName,
            time,
            timeInSecs
        }).catch(function(error) {
            console.log('Error writing new message to database', error);
        });
    }

    const loadLeaderboard = () => {
        let tempLeaderboard = [];
        let leaderRef = firebase.firestore()
                    .collection('leaderboard')
                    .orderBy('timeInSecs')
                    .limit(10);
        leaderRef.get().then((ref)=>{
            ref.forEach((doc)=>{
                console.log(doc.data());
                tempLeaderboard.push(doc.data());
            });
        }).catch((error)=>{
            console.log('Error getting document:',error);
        });
        return tempLeaderboard;
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

    // useEffect(()=>{
    //     if (gameEnd){
    //         // this should probably be run async in PostGame
    //         addEndTimestampToFirestore();
    //     }
    // },[gameEnd]);

    return (
      <div id="appContainer">
        <Header 
          gameChars={gameChars}
          gameStart={gameStart}
          gameEnd={gameEnd}
        />
        {gameStart ? null : <StartPage beginGame={beginGame}/>}
        {gameStart && !gameEnd ? <GameController 
                                    gameChars={gameChars}
                                    updateGameCharsFound={updateGameCharsFound}
                                 /> 
        : null}
        {gameStart && gameEnd ? <PostGame
                                    gameStart={gameStart}
                                    gameEnd={gameEnd}
                                    addEndTimestampToFirestore={addEndTimestampToFirestore}
                                    getFinalTime={getFinalTime}
                                    handleSubmitScore={handleSubmitScore}
                                    loadLeaderboard={loadLeaderboard}
                                />
                                :null}
      </div>
    );
}

export default App;
