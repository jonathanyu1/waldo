import React from 'react';

const StartPage = (props) => {

    return (
        <div id='startPageContainer'>
            <img 
                className='bgImage' 
                src={require(`../Images/Game/waldoGame.jpg`).default}
                alt='waldo game bg'
            />
            <div className='modal'>
                <div className='modalContent'>
                    <div id='modalTitle'>Where's Waldo?</div>
                    <div id='modalDescription'>
                        <div>Your goal is to find the characters above as quickly as possible!</div>
                        <div>Look through the image, click on the area and choose the corresponding name.</div>
                    </div>
                    <button 
                        id='btnStartGame'
                        className='btnChangePage'
                        onClick={props.beginGame}
                    >
                        Start Game
                    </button>
                </div>           
            </div>            
        </div>
    )

}

export default StartPage;