import React from 'react';

const Dropdown = (props) => {
    const {gameChars} = props;

    return (
        <div className='dropdownContainer' style={{left: props.clickCoords.pageX, top: props.clickCoords.pageY}}>
            <div id='dropdownBox'>
            </div>
            <div id='dropdownCharsContainer'>
                {gameChars.map((gameChar)=>{
                    return (
                        <div 
                            key={`dropdown${gameChar.name.charAt(0).toUpperCase()+gameChar.name.slice(1)}`}
                            id={`dropdown${gameChar.name.charAt(0).toUpperCase()+gameChar.name.slice(1)}`} 
                            className='dropdownChar'
                            onClick={()=>props.handleCharSelection(props.clickCoords, gameChar.name)}
                        >
                            <img 
                                src={require(`../Images/Header/${gameChar.name}Header.png`).default}
                                id={`dropdown${gameChar.name.charAt(0).toUpperCase()+gameChar.name.slice(1)}Img`}
                                className='dropdownCharImg'
                                alt={`${gameChar.name} header`}
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