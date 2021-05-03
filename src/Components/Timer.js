import React, {useEffect,useState} from 'react';

const Timer = (props) => {
    const {gameEnd} = props;
    const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000));
    const [displayTime, setDisplayTime] = useState('00:00:00');
    const [timer, setTimer] = useState();

    const startTimer = () => {
        let currTime = Math.floor(Date.now() / 1000);
        let diff = currTime - startTime;
        let sec = Math.floor(diff%60);
        let min = Math.floor(diff/60);
        let hour = Math.floor(diff/3600);
        sec=leadZero(sec);
        min=leadZero(min);
        hour=leadZero(hour);
        // console.log('---------');
        // console.log(currTime);
        // console.log(startTime);
        // console.log(diff);
        // console.log('min:',min);
        // console.log('sec:',sec);
        setDisplayTime(`${hour}:${min}:${sec}`);
        // let t = setTimeout(startTimer,1000);
    }

    const leadZero = (i) => {
        if (i<10){
            i='0'+i;
        }
        return i;
    }

    useEffect(()=>{
        if (gameEnd){
            console.log('timer game end');
            clearInterval(timer);
        }
    },[gameEnd]);

    useEffect(()=>{
        // startTimer();
        let timer = setTimer(setInterval(startTimer,1000));
    },[startTime]);

    // useEffect(()=>{
    //     setStartTime(Math.floor(Date.now() / 1000));
    // },[]);

    return (
        <div id='timerContainer'>
            {displayTime}
        </div>
    )
}

export default Timer;