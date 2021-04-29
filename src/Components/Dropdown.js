import React from 'react';

const Dropdown = (props) => {
    const {gameChars} = props;

    return (
        <div className='dropdownContainer' style={{left: props.clickCoords.x, top: props.clickCoords.y}}>
            <div id='dropdownBox'>
            </div>
            <div id='dropdownCharsContainer'>
                {gameChars.map((gameChar)=>{
                    return (
                        <div id={`dropdown${gameChar.name.charAt(0).toUpperCase()+gameChar.name.slice(1)}`} className='dropdownChar'>
                            <img 
                                src={require(`../Images/Header/${gameChar.name}Header.png`).default}
                                id={`dropdown${gameChar.name.charAt(0).toUpperCase()+gameChar.name.slice(1)}Img`}
                                className='dropdownCharImg'
                            />
                            {gameChar.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Dropdown;