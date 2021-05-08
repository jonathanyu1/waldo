import React, { useState } from 'react';
import Dropdown from './Dropdown';
import firebase from '../Firebase/firebase.js';

const GameController = (props) => {
    const {gameChars, updateGameCharsFound, updateChoiceMade} = props;
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [clickCoords, setClickCoords] = useState({x:0,y:0,pageX:0,pageY:0, offsetWidth:0, offsetHeight:0});

    const handleCharSelection = (coords, charName) => {
        let posX = Math.round((coords.x/coords.offsetWidth)*100);
        let posY = Math.round((coords.y/coords.offsetHeight)*100);
        let docRef = firebase.firestore()
                  .collection('charCoords')
                  .doc(`${charName}Coords`);
        docRef.get().then((doc)=>{
            if (doc.exists) {
                if (posX > doc.data().xCoordMin && 
                    posX < doc.data().xCoordMax && 
                    posY > doc.data().yCoordMin && 
                    posY < doc.data().yCoordMax){
                    updateGameCharsFound(charName);
                    updateChoiceMade(charName,true);
                } else {
                    updateChoiceMade(charName,false);
                }
            } else {
                console.log('no such document');
            }
        }).catch((error)=>{
            console.log('Error getting document:',error);
        });
        setDropdownVisible(false);
    }

    const updateClickCoords = (e) => {
        setClickCoords({x:e.nativeEvent.offsetX, 
                        y:e.nativeEvent.offsetY, 
                        pageX:e.pageX, 
                        pageY:e.pageY,
                        offsetWidth:e.nativeEvent.target.offsetWidth, 
                        offsetHeight:e.nativeEvent.target.offsetHeight
                    });
    }

    const handleClick = (e) => {
        setDropdownVisible(!dropdownVisible);
        updateClickCoords(e);
    }

    return (
        <div id='gameContainer'>
            <img 
                className='gameImage' 
                src={require(`../Images/Game/waldoGame.jpg`).default}
                onClick={handleClick}
                alt='waldo game bg'
            />
            {dropdownVisible && 
            <Dropdown 
                gameChars={gameChars.filter(gameChar => !gameChar.isFound())}
                clickCoords={clickCoords}
                handleCharSelection={handleCharSelection}
            />}
        </div>
    )
}

export default GameController;
