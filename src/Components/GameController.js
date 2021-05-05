import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import firebase, {firestore} from '../Firebase/firebase.js';

const GameController = (props) => {
    const {gameChars, updateGameCharsFound, updateChoiceMade} = props;
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [clickCoords, setClickCoords] = useState({x:0,y:0,pageX:0,pageY:0, offsetWidth:0, offsetHeight:0});

    // char coords (After calculate)
    // waldo: (40-44,16-23)
    // odlaw: (18-21,70-78)
    // wizard: (67-71,2-8)

    const handleCharSelection = (coords, charName) => {
        console.log(coords);
        let posX = Math.round((coords.x/coords.offsetWidth)*100);
        let posY = Math.round((coords.y/coords.offsetHeight)*100);
        console.log(posX);
        console.log(posY);
        console.log(charName);
        let docRef = firebase.firestore()
                  .collection('charCoords')
                  .doc(`${charName}Coords`);
        docRef.get().then((doc)=>{
            if (doc.exists) {
                console.log(doc.data());
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
        console.log(e);
        setClickCoords({x:e.nativeEvent.offsetX, 
                        y:e.nativeEvent.offsetY, 
                        pageX:e.pageX, 
                        pageY:e.pageY,
                        offsetWidth:e.nativeEvent.target.offsetWidth, 
                        offsetHeight:e.nativeEvent.target.offsetHeight
                    });
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
