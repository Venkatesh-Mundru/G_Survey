//This file sets up and manages SQLite database. 
//It creates the necessary tables (survey and admin) and connects backend to the database so we can store and retrieve data.

const sqlite3 = require('sqlite3').verbose(); //imports the SQLite3 library. verbose() enables detailed error logging, which is helpful for debugging.
const path = require('path'); //helps your app figure out where to save the database file


/* 
1. creates or opens a SQLite database file named DisplacedData.db.
2. path.resolve(__dirname, 'DisplacedData.db') ensures the file is created in the same folder as db.js.
   If the file doesn’t exist, SQLite will create it.
*/
const db = new sqlite3.Database(path.resolve(__dirname, 'DisplacedData.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});


/* 
1. serialize() ensures that all the database operations inside it run sequentially.
2. creates survey table
*/
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS survey (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    gender TEXT,
    age INTEGER,
    dob TEXT,
    nationality TEXT,
    marital TEXT,
    dependents INTEGER,
    currentLocation TEXT,
    previousLocation TEXT,
    phone TEXT,
    email TEXT,
    language TEXT,
    displacementDate TEXT,
    reasonConflict TEXT,
    reasonDisaster TEXT,
    reasonDevelopment TEXT,
    reasonOther TEXT,
    reasonOtherText TEXT,
    displacementType TEXT,
    duration TEXT,
    accessWater TEXT,
    accessSanitation TEXT,
    accessElectricity TEXT,
    accessHealthcare TEXT,
    accessEducation TEXT,
    accessSafety TEXT,
    safetyConcerns TEXT,
    HighestLevelofEducation TEXT,
    languageSpoken TEXT,
    SkillsYouHave TEXT,
    Skillsyouwanttolearn TEXT
  )`);


  /* 
   creates admin table
  */
  db.run(`CREATE TABLE IF NOT EXISTS admin (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
  )`);


  /*
    1. Inserts Default admin user
    2. INSERT OR IGNORE ensures it doesn’t insert again if the user already exists.
  */
  db.run(`INSERT OR IGNORE INTO admin (username, password) VALUES ('admin', '1234')`);

});


/* 
This exports the db object so other files (like formRoutes.js and adminRoutes.js) can use it to interact with the database.
*/
module.exports = db;
