const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors({
    origin: 'http://localhost:3000', 
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

app.use(express.json());

const fs = require('fs');

const {calculateRoomUtilization} = require('./calculations/data_calculations');

  
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to your server!' });
});

app.get('/data/:date', (req, res) => {
    const useSampleData = req.query.sample === 'true';
    // Determine the file path based on whether sample data is requested
    const filePath = useSampleData ? '../Tests/sample-data.json' : './uploads/operations_data.json'; 
    console.log(filePath);

    // Read the appropriate data file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        try {
            const jsonData = JSON.parse(data);
            const utilizationData = calculateRoomUtilization(jsonData, req.params.date);
            res.json(utilizationData);
            
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});
