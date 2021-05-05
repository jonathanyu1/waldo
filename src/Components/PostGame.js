import React, {useState,useEffect} from 'react';
import Leaderboard from './Leaderboard';

const PostGame = (props) => {
    const {gameStart, gameEnd, addEndTimestampToFirestore, getFinalTime, handleSubmitScore, loadLeaderboard} = props;
    const [finalTimeSecs, setFinalTimeSecs] = useState(null);
    const [finalTime, setFinalTime] = useState(null);
    const [userNameInput, setUserNameInput] = useState('');
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const loadingIcon = <i className="fa fa-spinner" aria-hidden="true"></i>

    const handleInputChange = (e) => {
        setUserNameInput(`${e.target.value}`);
    }

    const leadZero = (i) => {
        if (i<10){
            i='0'+i;
        }
        return i;
    }

    const handleGameEnd = async () => {
        await addEndTimestampToFirestore();
        let tempFinalTimeSecs = await getFinalTime();
        console.log('tempFinalTimeSecs:',tempFinalTimeSecs);
        let sec = leadZero(Math.floor(tempFinalTimeSecs%60));
        let min = leadZero(Math.floor(tempFinalTimeSecs/60));
        let hour = leadZero(Math.floor(tempFinalTimeSecs/3600));
        setFinalTimeSecs(tempFinalTimeSecs);
        setFinalTime(`${hour}:${min}:${sec}`);
    }

    // const handleSubmit = async () => {
    //     await handleSubmitScore(userNameInput,finalTime,finalTimeSecs);
    //     setShowLeaderboard(true);
    // }
    
    // const handleCancel = async () => {
    //     setShowLeaderboard(true);
    // }

    // const handleLoadLeaderboard = async () => {
    //     let tempLeaderboard = await loadLeaderboard();
    //     console.log(tempLeaderboard);
    //     setLeaderboard(tempLeaderboard);
    // }

    // useEffect(()=>{
    //     console.log(leaderboard);
    // },[leaderboard]);

    // useEffect(()=>{
    //     if (showLeaderboard){
    //         handleLoadLeaderboard();
    //     }
    // },[showLeaderboard]);

    const handleSubmit = async () => {
        await handleSubmitScore(userNameInput,finalTime,finalTimeSecs);
        handleLoadLeaderboard();
    }
    
    const handleCancel = () => {
        handleLoadLeaderboard();
    }

    const handleLoadLeaderboard = async () => {
        try{
            let tempLeaderboard = await loadLeaderboard();
            console.log(tempLeaderboard);
            setLeaderboard(tempLeaderboard);
        } catch(error){
            console.log('error:',error);
        }

    }

    useEffect(()=>{
        if (leaderboard.length>0){
            setShowLeaderboard(true);
            console.log(leaderboard);
        }
    },[leaderboard]);

    useEffect(()=>{
        if (gameEnd){
            handleGameEnd();
        }
    },[gameEnd]);

    return (
        <div id='postGameContainer'>
            {showLeaderboard ? 
                <div id='leaderboardContainer'>
                    <div className='highScoreTitle'>
                        <div className='highScoreTitleName'>Name</div>
                        <div className='highScoreTitleScore'>Score</div>
                    </div>
                    {leaderboard.length ? <Leaderboard leaderboard={leaderboard} userNameInput={userNameInput}/> : loadingIcon}
                    {/* {leaderboard.map((highscore)=>{
                        console.log(highscore);
                        return (
                            (highscore.name === userNameInput ? 
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
                    })} */}
                </div>
            :
            <div id='postGameFormContainer'>
                <div id='postGameText'>
                    Your time is: 
                </div>
                <div id='postGameTime'>
                    {finalTime ? finalTime : loadingIcon}
                </div>
                {finalTime ?
                <div id='postGameForm'>
                    <label 
                        htmlFor='userName'
                        className='labelUserName'
                    >
                        Enter your name: 
                    </label>
                    <input
                        onChange={handleInputChange}
                        value={userNameInput}
                        type='text'
                        id='userNameInput'
                        name='userNameInput'
                        maxLength='20'
                    />
                    <button 
                        // onClick={()=>handleSubmitScore(userNameInput,finalTime,finalTimeSecs)}
                        onClick={handleSubmit}
                        id='btnSubmitScore'
                        className='btnSubmitScore'
                        type='button'
                    >
                        Submit
                    </button>
                    <button 
                        onClick={handleCancel}
                        id='btnCancelSubmit'
                        className='btnCancelSubmit'
                        type='button'
                    >
                        Cancel
                    </button>
                </div> 
                :
                null}
            </div>
            }
        </div>
    )
}

export default PostGame;