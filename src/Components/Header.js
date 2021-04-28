import React, {useEffect,useState} from 'react';
import HeaderChar from './HeaderChar';
// import waldoHeader from '../Images/waldoHeader.png';

const Header = (props) => {
    const {gameChars} = props;
    // const [image,setImage]=useState(null);
    // const [imageName,setImageName]=useState(null);

    // useEffect(()=>{
    //     setImageName('waldoHeader');
    //     loadImageName('waldoHeader');
    // },[]);

    return (
        <div id='headerContainer'>
            {/* <img src={waldoHeader} alt='waldo header'/> */}
            {/* {image && <img src={image} alt='waldo header'/>}
            <img src={image}/>
            <img src={waldoHeader}/>
            <img src={require(`../Images/waldoHeader.png`).default}/>
            {imageName && <img src={require(`../Images/${imageName}.png`).default}/>} */}
            <div id='headerCharsContainer'>
                {gameChars.map(gameChar => {
                    return (
                        <HeaderChar
                            key={gameChar.name}
                            name={gameChar.name}
                            isFound={gameChar.isFound()}
                        />
                    )
                })}
            </div>
        </div>
    )

}

export default Header;