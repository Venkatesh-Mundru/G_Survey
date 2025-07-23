/* 
This file is the entry point for your backend. It sets up a web server using Node.js and Express.
it listens for requests from the frontend and sends them to the right place.
*/


const express = require('express'); //This brings in the Express library helps build webserver easily.

/* 
CORS stands for Cross-Origin Resource Sharing.
It allows your frontend (running on one port like 5173) to talk to your backend (running on another port like 3001).
*/
const cors = require('cors');

const bodyParser = require('body-parser'); // helps server understand incoming data.


/*
These lines import your route files.
formRoutes handles survey form submissions.
adminRoutes handles admin login, viewing data, and downloading CSV.
*/
const formRoutes = require('./routes/formRoutes');
const adminRoutes = require('./routes/adminRoutes');


/* 
creates an Express app.
like saying: “Start a new web server.”
*/
const app = express();

const PORT = 3001; //sets the port number for your backend.

app.use(cors()); //This tells server: “Allow requests from other places (like your React frontend).”
app.use(bodyParser.json()); // tells server: “Expect incoming data to be in JSON format

app.use('/api/form', formRoutes); // says: “If someone sends a request to /api/form, use the rules in formRoutes.js.”
app.use('/api/admin', adminRoutes); // says: “If someone sends a request to /api/admin, use the rules in adminRoutes.js.”


/* 
starts the server and listens for requests.
When it’s ready, it prints
*/
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
