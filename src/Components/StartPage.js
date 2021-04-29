import React from 'react';

const StartPage = (props) => {

    return (
        <div id='startPageContainer'>
            <div id='startPageTitle'>
                Where's Waldo?
            </div>
            <div id='startPageDescription'>
                <h3>Your goal is to find the characters above as quickly as possible!</h3>
                <h3>Look through the image, click on the character found and choose the corresponding name.</h3>
            </div>
            <button 
                id='btnStartGame'
                onClick={props.beginGame}
            >
                Start Game
            </button>
        </div>
    )

}

export default StartPage;