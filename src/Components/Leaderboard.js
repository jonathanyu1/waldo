import React from 'react';

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
                            <div className='myHighScoreContainer'> 
                                <div className='highScoreName'>{highscore.name}</div>
                                <div className='highScoreTime'>{highscore.time}</div>
                            </div>
                        : 
                            <div className='highScoreContainer'>
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