//initializing MonthlyData
function initializeMonthlyData (MonthlyData){
    if (Object.keys(MonthlyData).length === 0) {
      MonthlyData.dailyUtilization = 0, 
      MonthlyData.monthlyAvgUtilization = 0,
      MonthlyData.staffPerSelectedDay = new Set(),
      MonthlyData.staffPerMonth = new Set(),
      MonthlyData.activeDays = new Set(),
      MonthlyData.averageStaffPerDay = 0
    };
  }

//initializing RoomData
function initializeRoomData(operation,roomData){
    const roomId = operation.room_id;
    if (!roomData[roomId]) {
      roomData[roomId] = {
        roomId: roomId,
        dailyUtilization: 0,
        monthlyAvgUtilization: 0,
        activeDays: new Set(),
        usageInHours :0
      };
    }
    return roomId;
}

module.exports = {
    initializeRoomData,
    initializeMonthlyData
};
  