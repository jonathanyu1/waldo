import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Leaderboard = (props) => {

   
    return (
        <React.Fragment>
            {props.leaderboard.map((highscore, index)=>{
                return (
                    (highscore.name === props.userNameInput ? 
                            <div className='myHighScoreContainer' key={uuidv4()}> 
                                <div className='highScoreName'>
                                    {index === 0 && <img className='leaderboardIcon' src={require(`../Images/Header/waldoHeader.png`).default} alt='1st place icon'/>}
                                    {index === 1 && <img className='leaderboardIcon' src={require(`../Images/Header/odlawHeader.png`).default} alt='2nd place icon'/>}
                                    {index === 2 && <img className='leaderboardIcon' src={require(`../Images/Header/wizardHeader.png`).default} alt='3rd place icon'/>}
                                    {highscore.name}
                                </div>
                                <div className='highScoreTime'>{highscore.time}</div>
                            </div>
                        : 
                            <div className='highScoreContainer'  key={uuidv4()}>
                                <div className='highScoreName'>
                                    {index === 0 && <img className='leaderboardIcon' src={require(`../Images/Header/waldoHeader.png`).default} alt='1st place icon'/>}
                                    {index === 1 && <img className='leaderboardIcon' src={require(`../Images/Header/odlawHeader.png`).default} alt='2nd place icon'/>}
                                    {index === 2 && <img className='leaderboardIcon' src={require(`../Images/Header/wizardHeader.png`).default} alt='3rd place icon'/>}
                                    {highscore.name}
                                </div>
                                <div className='highScoreTime'>{highscore.time}</div>
                            </div>
                    )
                )
            })}
        </React.Fragment>
    )
    
}

export default Leaderboard;