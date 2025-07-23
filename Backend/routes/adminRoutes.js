/* 
handles routes related to admin functionality, such as:
Logging in as admin
Viewing submitted survey data
Downloading survey data as a CSV file
*/

const express = require('express');

const router = express.Router();

const db = require('../db');

const fs = require('fs'); //fs: Node.js module to work with the file system 
const path = require('path');


/* 
Defines a POST route at /login.
Extracts username and password from the request body (sent from the login form).
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  //Runs a SQL query to check if the username and password match any record in the admin table.
  db.get('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else if (row) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

/* 
Defines a GET route at /data.
Runs a SQL query to fetch all rows from the survey table.
*/
router.get('/data', (req, res) => {
  db.all('SELECT * FROM survey', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(rows);
    }
  });
});

/*
Defines a GET route at /download.
Fetches all survey data from the database.
*/
router.get('/download', (req, res) => {
  db.all('SELECT * FROM survey', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      //Defines the column headers for the CSV file.
      const csvHeader = [
        'Full Name', 'Gender', 'Age', 'DOB', 'Nationality', 'Marital Status', 'Dependents',
        'Current Location', 'Previous Location', 'Phone', 'Email', 'Language',
        'Displacement Date', 'Conflict', 'Disaster', 'Development', 'Other', 'Other Reason',
        'Displacement Type', 'Duration',
        'Water', 'Sanitation', 'Electricity', 'Healthcare', 'Education', 'Safety', 'Safety Concerns'
      ];
      //Converts each row of survey data into an array of values matching the header order.
      const csvRows = rows.map(row => [
        row.fullName, row.gender, row.age, row.dob, row.nationality, row.marital, row.dependents,
        row.currentLocation, row.previousLocation, row.phone, row.email, row.language,
        row.displacementDate, row.reasonConflict, row.reasonDisaster, row.reasonDevelopment, row.reasonOther, row.reasonOtherText,
        row.displacementType, row.duration,
        row.accessWater, row.accessSanitation, row.accessElectricity, row.accessHealthcare, row.accessEducation, row.accessSafety,
        row.safetyConcerns
      ]);

      //Converts each row of survey data into an array of values matching the header order.
      const csvContent = [csvHeader.join(','), ...csvRows.map(r => r.join(','))].join('\n');

      //Saves the CSV content to a file named survey_data.csv in the project directory.
      const filePath = path.join(__dirname, '../survey_data.csv');
      fs.writeFileSync(filePath, csvContent);

      //Sends the file to the browser for download.
      res.download(filePath);
    }
  });
});

module.exports = router;
