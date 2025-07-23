/* 
 It handles the logic for receiving form submissions from the frontend and saving them into your SQLite database.
*/


const express = require('express');

/* 
Creates a router object. Think of it as a mini Express app that handles specific routes (URLs). 
You’ll use this to define what happens when someone sends a request to a certain endpoint.
*/
const router = express.Router();

/*
This imports your database connection from a file named db.js.
 It allows you to run SQL queries on your SQLite database.
 */
const db = require('../db');


/* 
This sets up a POST route at /
req.body contains the form data sent from the frontend
*/
router.post('/', (req, res) => {
  const data = req.body;


  /* 
  SQL query to insert a new row into the survey table.
  The ? placeholders will be replaced with actual values from the form.  */

  const query = `
    INSERT INTO survey (
      fullName, gender, age, dob, nationality, marital, dependents,
      currentLocation, previousLocation, phone, email, language,
      displacementDate, reasonConflict, reasonDisaster, reasonDevelopment, reasonOther, reasonOtherText,
      displacementType, duration,
      accessWater, accessSanitation, accessElectricity, accessHealthcare, accessEducation, accessSafety,
      safetyConcerns,HighestLevelofEducation,languageSpoken,SkillsYouHave,Skillsyouwanttolearn
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;


  //This array holds the actual values to be inserted into the database.
  const values = [
    data.fullName, data.gender, data.age, data.dob, data.nationality, data.marital,data.dependents,data.currentLocation,
    data.previousLocation, data.phone, data.email, data.language,
    data.displacementDate,
    data.displacementReasons?.includes('Conflict/Violence') ? "Conflict" : "",
    data.displacementReasons?.includes('Natural Disaster') ? "Natural Disaster" : "",
    data.displacementReasons?.includes('Development Project') ? 1 : 0,
    data.displacementReasons?.includes('Other') ? 1 : 0,
    data.otherReason,
    data.displacementType, data.durationOfStay,
    data.services?.includes('Water') ? 1 : 0,
    data.services?.includes('Sanitation') ? 1 : 0,
data.services?.includes('Electricity') ? 1 : 0,
    data.services?.includes('Healthcare') ? 1 : 0,
    data.services?.includes('Education') ? 1 : 0,
    data.services?.includes('Safety Concerns') ? 1 : 0,
    data.safetyConcerns,
    data.HighestLevelofEducation,
    data.languageSpoken,
    data.SkillsYouHave,
    data.Skillsyouwanttolearn
  ];

  //executes the SQL query using db.run.
  db.run(query, values, function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json({ message: 'Form submitted successfully' });
    }
  });
});

module.exports = router;
