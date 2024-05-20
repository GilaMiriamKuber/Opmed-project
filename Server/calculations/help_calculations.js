const moment = require('moment');

//sorting rooms in roomData accourding to the id
function sortRoomData(roomData){
    const sortedRoomData = Object.fromEntries(
      Object.entries(roomData).sort(([roomIdA], [roomIdB]) => {
        const [, numberA] = roomIdA.split('-');
        const [, numberB] = roomIdB.split('-');
        return parseInt(numberA) - parseInt(numberB);
      })
    );
    return sortedRoomData;
}

//calculatating surgery duration
function calculateSurgeryDuration(operation) {
    operation.start = moment(operation.start);
    operation.end = moment(operation.end);
    const duration = Math.abs(moment.duration(operation.end.diff(operation.start)).asHours());
    return duration;
}

module.exports = {
    calculateSurgeryDuration,
    sortRoomData
  };