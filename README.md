## Application Summary:

The application is a full-stack web solution written in Node.js and React. It is designed to manage surgical data, process it, and display relevant metrics on a web interface. Playwright is used for automated testing of both the backend and frontend components.

## Key Features:

### Data Management:

- Ingests surgical data from a JSON file.
- Processes the data to calculate metrics such as daily room utilization and staff counts.

### Web Interface:

- Provides a user-friendly interface built with React for data visualization.
- Allows users to interact with the application and view surgical metrics.

### Automated Testing:

- Utilizes Playwright for automated testing of both backend and frontend components.
- Ensures data accuracy and application functionality through automated tests.

## Running the Server:
To run the backend, follow these commands:
1.Navigate to the backend directory:
### `cd Server`
2.Install packages
### `npm i`
3.Run the application using Node.js:
### `node server.js`

Runs the app in the development mode.\
Open [http://localhost:8000] to view it in your browser.

note: The controller is located in the app.js file and all calculations are performed in calculation.js

## Running the Client:

1.Navigate to the frontend directory:
### `cd Client\my-client-app`
2.Install packages
### `npm i`
3.Start the application using npm:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000] to view it in your browser.

## Running Tests:
Ensure that the server and client are running before executing the tests.

1.Navigate to the testing directory:
### `cd Tests`
2.Install packages
### `npm i`
3.Run all the tests:
### `npx playwright test`
4.run a specific test:
### `npx playwright test <nameTest>`

After the output appears in the terminal, press Ctrl + C to display the test coverage percentages.
Execute these commands in order to run the tests for your project.

