const moment = require('moment');

const WORKING_HOURS = 16;

// Import functions for initializing data and sorting room data
const { initializeMonthlyData, initializeRoomData } = require('./objects_settup');
const { sortRoomData, calculateSurgeryDuration } = require('./help_calculations');

// Function to calculate room utilization based on provided data and requested date
function calculateRoomUtilization(data, requestedDate) {
  try {
    // Format requested date using Moment.js
    const selectedDate = moment(requestedDate).format('DD-MM-YYYY');
    // Filter data based on the selected date
    const filteredByDate = data.filter(operation => moment(operation.start).format('MM-YYYY') === selectedDate.substring(3, 10));

    // Initialize MonthlyData and roomData objects
    let MonthlyData = {};
    let roomData = {};

    // Return message if no data found for the requested date
    if (!filteredByDate.length) {
      return "No data found for requested date.";
    }

    // Initialize MonthlyData
    initializeMonthlyData(MonthlyData);

    // Iterate through filtered data to calculate monthly and room-specific metrics
    filteredByDate.forEach(operation => {
      let roomId = initializeRoomData(operation, roomData);
      calculateMonthlyData(operation, selectedDate, MonthlyData, roomData, roomId);
      calculateRoomOccupancy(operation, selectedDate, roomId, roomData);
    });

    // Calculate staff metrics and room utilizations
    MonthlyData.staffPerSelectedDay = MonthlyData.staffPerSelectedDay.size;
    MonthlyData.averageStaffPerDay = MonthlyData.staffPerMonth.size / MonthlyData.activeDays.size;

    // Adjust room utilizations to percentages
    for (const room in roomData) {
      roomData[room].dailyUtilization = roomData[room].dailyUtilization / WORKING_HOURS * 100;
      roomData[room].monthlyAvgUtilization = (roomData[room].monthlyAvgUtilization / roomData[room].activeDays.size) / WORKING_HOURS * 100;
    }

    // Sort room data and return MonthlyData and roomData if data available for the requested date
    if (MonthlyData.activeDays.has(requestedDate)) {
      roomData = sortRoomData(roomData);
      console.log(roomData);
      return [MonthlyData, roomData];
    } else {
      return "no data";
    }
  } catch (error) {
    // Log error if any
    console.error('Error parsing JSON:', error);
  }
}

// Function to calculate monthly staff data and utilization
function calculateMonthlyData(operation, selectedDate, MonthlyData) {
  for (let staff of operation.staff) {
    MonthlyData.staffPerMonth.add(staff);
    if (moment(operation.start).format('DD-MM-YYYY') === selectedDate) {
      MonthlyData.staffPerSelectedDay.add(staff);
    }
  }
  const currentDayDuration = calculateSurgeryDuration(operation);
  if (moment(operation.start).format('DD-MM-YYYY') === selectedDate) {
    MonthlyData.dailyUtilization += currentDayDuration;
  }
  MonthlyData.activeDays.add(moment(operation.start).format('YYYY-MM-DD'));
}

// Function to calculate daily and monthly average room occupancy
function calculateRoomOccupancy(operation, selectedDate, roomId, roomData) {
  // Add active day for the room
  roomData[roomId].activeDays.add(moment(operation.start).format('YYYY-MM-DD'));
  // Calculate surgery duration and update room metrics
  const surgeryDuration = calculateSurgeryDuration(operation);
  roomData[roomId].monthlyAvgUtilization += surgeryDuration;
  roomData[roomId].usageInHours += surgeryDuration; // Update total usage hours
  if (moment(operation.start).format('DD-MM-YYYY') === selectedDate) {
    roomData[roomId].dailyUtilization += surgeryDuration;
  }
}

// Export functions for use in other modules
module.exports = {
  calculateRoomUtilization,
  calculateMonthlyData,
  calculateRoomOccupancy
};
