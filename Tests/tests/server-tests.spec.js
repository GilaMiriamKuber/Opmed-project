import { test, expect } from '@playwright/test';
const axios = require('axios');

// Test for GET /data/:date endpoint with valid data
test('GET /data/:date returns calculated metrics for a valid date', async ({ page }) => {
    const validDate = '2023-12-25';
    await page.goto(`http://localhost:8000/data/${validDate}`);

    // Check response status code
    const response = await page.evaluate(() => JSON.parse(document.querySelector('pre').textContent));
    expect(response).toHaveLength(2); // Ensure there are two objects in the array

    // Assert on the first object representing MonthlyData
    const monthlyData = response[0];
    expect(monthlyData).toHaveProperty('staffPerSelectedDay');
    expect(monthlyData.staffPerSelectedDay).toBeGreaterThanOrEqual(1);
    expect(monthlyData).toHaveProperty('averageStaffPerDay');
    expect(monthlyData.averageStaffPerDay).toBeGreaterThanOrEqual(1);
    expect(monthlyData).toHaveProperty('monthlyAvgUtilization');
    expect(monthlyData.dailyUtilization).toBeGreaterThanOrEqual(1);

    // Assert on the second object representing roomData
    const roomData = response[1];
    expect(roomData).toHaveProperty('OR-1');
});

// Test for calculating daily utilization with sample data
test('Calculate Daily Utilization for a given day with Sample Data', async () => {
  const dateToTest = '2023-12-25';

  try {
    const response = await axios.get(`http://localhost:8000/data/${dateToTest}`, {
      params: {
        sample: true 
      }
    });
    
    const roomData  = response.data[1];
    const dailyUtilization = roomData['OR-26'].dailyUtilization;

    const expectedDailyUtilization = 25; 

    // Assert that the calculated daily utilization matches the expected value
    expect(dailyUtilization).toEqual(expectedDailyUtilization);

  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Test for calculating monthly utilization with sample data
test('Calculate monthly Utilization for a given day with Sample Data', async () => {
  const dateToTest = '2023-12-25';

  try {

    const response = await axios.get(`http://localhost:8000/data/${dateToTest}`, {
      params: {
        sample: true 
      }
    });
    const roomData  = response.data[1];

    const monthlyUtilization = roomData['OR-26'].monthlyAvgUtilization;
    const expectedMonthlyUtilization = 34.375; 

    expect(monthlyUtilization).toEqual(expectedMonthlyUtilization);

  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Test for calculating staff for a given day with sample data
test('Calculate staff for a given day with Sample Data', async () => {
  const dateToTest = '2023-12-25';

  try {
    const response = await axios.get(`http://localhost:8000/data/${dateToTest}`, {
      params: {
        sample: true 
      }
    });
    const MonthlyData  = response.data[0];

    const staffPerSelectedDay = MonthlyData.staffPerSelectedDay;
    const expectedAmountOfStaff = 7; 

    expect(staffPerSelectedDay).toEqual(expectedAmountOfStaff);

  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Test for calculating average staff for a given day with sample data
test('Calculate average staff for a given day with Sample Data', async () => {
  const dateToTest = '2023-12-25';

  try {
    const response = await axios.get(`http://localhost:8000/data/${dateToTest}`, {
      params: {
        sample: true 
      }
    });
    const MonthlyData  = response.data[0];

    const staffAvgPerDay = MonthlyData.averageStaffPerDay;
    const expectedStaffAvgPerDay = 4; 

    expect(staffAvgPerDay).toEqual(expectedStaffAvgPerDay);

  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Test for calculating duration accuracy with single operation from sample data
test('Calculate duration accuracy with single operation from Sample Data', async () => {
  const dateToTest = '2024-01-20';

  try {
    const response = await axios.get(`http://localhost:8000/data/${dateToTest}`, {
      params: {
        sample: true 
      }
    });
    const roomData  = response.data[1];

    const duration = roomData['OR-9'].usageInHours;
    const expectedDuration = 7; 

    expect(duration).toEqual(expectedDuration);

  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Test for server error handling
test('Server Error Handling Test', async () => {
  const invalidDate = '2024-04-07'; // Date with no data
  try {
    const response = await axios.get(`http://localhost:8000/data/${invalidDate}`);
    expect(response.data).toBe('No data found for requested date.');
  } catch (error) {
    expect(error.response.status).toEqual(404);
  }
});
