const characterFactory = (charName) => {
    const name = charName;
    const foundStatus = false;
    const setFoundStatus = (status) => {
        foundStatus = status;
    }
    const isFound = () => foundStatus;
    return {name, setFoundStatus, isFound}
}

export default characterFactory;