import React, {useEffect,useState} from 'react';

const Timer = (props) => {
    const {gameEnd, getFinalTime} = props;
    const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000));
    const [displayTime, setDisplayTime] = useState('00:00:00');
    const [timer, setTimer] = useState();

    const leadZero = (i) => {
        if (i<10){
            i='0'+i;
        }
        return i;
    }

    const startTimer = () => {
        let currTime = Math.floor(Date.now() / 1000);
        let diff = currTime - startTime;
        let sec = Math.floor(diff%60);
        let min = Math.floor(diff/60);
        let hour = Math.floor(diff/3600);
        sec=leadZero(sec);
        min=leadZero(min);
        hour=leadZero(hour);
        setDisplayTime(`${hour}:${min}:${sec}`);
    }

    const clearDisplayTime = () => {
        setDisplayTime('');
    }

    useEffect(()=>{
        if (gameEnd){
            console.log('timer game end');
            clearInterval(timer);
            clearDisplayTime();
        }
    },[gameEnd]);

    useEffect(()=>{
        let timer = setTimer(setInterval(startTimer,1000));
    },[startTime]);

    return (
        <React.Fragment>
        {displayTime ? 
            <div id='timerContainer'>
                {displayTime}
            </div>
        : null
        }
        </React.Fragment>
    )
}

export default Timer;