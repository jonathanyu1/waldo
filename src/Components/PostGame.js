import React, {useState,useEffect} from 'react';
import Leaderboard from './Leaderboard';
var Filter = require('bad-words');

const PostGame = (props) => {
    const {gameEnd, addEndTimestampToFirestore, getFinalTime, handleSubmitScore, loadLeaderboard, newGame} = props;
    const [finalTimeSecs, setFinalTimeSecs] = useState(null);
    const [finalTime, setFinalTime] = useState(null);
    const [userNameInput, setUserNameInput] = useState('');
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [nameIsProfanity, setNameIsProfanity] = useState(false);
    const filter = new Filter();
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

    const handleInputCheck = () => {
        if (filter.isProfane(userNameInput)){
            setNameIsProfanity(true);
        } else {
            setNameIsProfanity(false);
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        await handleSubmitScore(userNameInput,finalTime,finalTimeSecs);
        handleLoadLeaderboard();
    }
    
    const handleCancel = () => {
        handleLoadLeaderboard();
    }

    const resetStates = () => {
        setFinalTimeSecs(null);
        setFinalTime(null);
        setUserNameInput('');
        setShowLeaderboard(false);
        setLeaderboard([]);
    }

    const handleReturnHome = () => {
        // reset states
        resetStates();
        // reset states in App, return to main
        newGame();
    }

    const handleLoadLeaderboard = async () => {
        try{
            setShowLeaderboard(true);
            let tempLeaderboard = await loadLeaderboard();
            console.log(tempLeaderboard);
            setLeaderboard(tempLeaderboard);
        } catch(error){
            console.log('error:',error);
        }

    }

    useEffect(()=>{
        if (gameEnd){
            handleGameEnd();
        }
    },[gameEnd]);

    return (
        <div id='postGameContainer'>
            {showLeaderboard ? 
                <React.Fragment>
                    <div id='leaderboardTitle'>Highscores</div>
                    <div id='leaderboardContainer'>
                        <div className='highScoreTitle'>
                            <div className='highScoreTitleName'>Name</div>
                            <div className='highScoreTitleScore'>Score</div>
                        </div>
                        {leaderboard.length ? <Leaderboard leaderboard={leaderboard} userNameInput={userNameInput}/> : loadingIcon}
                    </div>
                    <button 
                        id='btnReturnHome'
                        className='btnChangePage'
                        onClick={handleReturnHome}
                    >Return Home
                    </button>
                </React.Fragment>
            :
            <div id='postGameFormContainer'>
                <div id='postGameText'>
                    Your time is: {finalTime ? finalTime : loadingIcon}
                </div>
                {/* <div id='postGameTime'>
                    {finalTime ? finalTime : loadingIcon}
                </div> */}
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
                        onClick={handleInputCheck}
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
                    {nameIsProfanity ? <div id='inputError'>Your name is not allowed, try again.</div>:null}
                </div> 
                :
                null}
            </div>
            }
        </div>
    )
}

export default PostGame;