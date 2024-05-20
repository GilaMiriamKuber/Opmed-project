import { test, expect } from '@playwright/test';

// Test to verify handling of days with no data
test('Test that days with no data are handled correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Select a Date:').fill('2024-04-07');
  await page.waitForSelector('h1.no-data-text', { state: 'visible' });
  const noDataText = await page.textContent('h1.no-data-text');
  expect(noDataText).toContain('There is no data for the requested date');
});

// Test to verify visibility of metric data
test('Tests that the metric data is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Select a Date:').fill('2024-01-05');
  await page.waitForSelector('.table-container');
  const isMetricsDisplayed = await page.isVisible('.table-container');
  expect(isMetricsDisplayed).toBe(true);
});

// Test to verify accuracy of staff appearance
test('Test data staff appearance accuracy', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Select a Date:').fill('2023-12-25');
  await page.waitForSelector('.table-container');
  const staffInfo = await page.textContent('.staff-amount');
  let staffNumber = 0;
  if (staffInfo) {
     staffNumber = parseInt(staffInfo.split(":")[1].trim());
  } else {
    console.error('Staff info element not found.');
  }
  const expectedDailyUtilization = 275; 

  expect(staffNumber).toEqual(expectedDailyUtilization);
});
