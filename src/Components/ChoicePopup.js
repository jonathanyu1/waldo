import React from 'react';

const ChoicePopup = (props) => {

    return (
        <div id='choicePopupContainer'>
            {/* You chose {props.dropdownChoice} which was {props.boolChoiceMade} */}
            {props.boolChoiceMade ? 
            `Good job, you found ${props.dropdownChoice.charAt(0).toUpperCase()+props.dropdownChoice.slice(1)}!`
            : 
            `That's not ${props.dropdownChoice.charAt(0).toUpperCase()+props.dropdownChoice.slice(1)}. Keep trying!`
            }
        </div>
    )
}

export default ChoicePopup;