
export default (roomData = {}, action) => {
    return (action.type === "UPDATE_ROOM_DATA" ? action.payload : roomData);
}
