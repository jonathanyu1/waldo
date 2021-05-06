import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Leaderboard = (props) => {

    // return (
    //     (props.leaderboard.map((highscore)=>{
    //         return (
    //             (highscore.name === props.userNameInput ? 
    //                     <div className='myHighScoreContainer'> 
    //                         <div className='highScoreName'>{highscore.name}</div>
    //                         <div className='highScoreTime'>{highscore.time}</div>
    //                     </div>
    //                 : 
    //                     <div className='highScoreContainer'>
    //                         <div className='highScoreName'>{highscore.name}</div>
    //                         <div className='highScoreTime'>{highscore.time}</div>
    //                     </div>
    //             )
    //         )
    //     }))
    // )
    return (
        <React.Fragment>
            {props.leaderboard.map((highscore)=>{
                return (
                    (highscore.name === props.userNameInput ? 
                            <div className='myHighScoreContainer' key={uuidv4()}> 
                                <div className='highScoreName'>{highscore.name}</div>
                                <div className='highScoreTime'>{highscore.time}</div>
                            </div>
                        : 
                            <div className='highScoreContainer'  key={uuidv4()}>
                                <div className='highScoreName'>{highscore.name}</div>
                                <div className='highScoreTime'>{highscore.time}</div>
                            </div>
                    )
                )
            })}
        </React.Fragment>
    )
    
}

export default Leaderboard;