/*
This is the entry point of your React frontend. 
It’s the first file that runs when your app loads in the browser. 
*/

import React from 'react'; //imports the React library, which is used to build user interfaces

/* 
imports the createRoot function from React DOM.
It’s used to attach your React app to the HTML page (specifically to a <div> with id="root").
*/
import { createRoot } from 'react-dom/client'; 

/* 
Imports BrowserRouter from the react-router-dom library.
It enables routing in your app
*/
import { BrowserRouter } from 'react-router-dom';

/* 
Imports your main App component.
This component usually contains your routes and wraps all other components 
*/
import App from './App.jsx';


/* 
document.getElementById('root'): Finds the <div id="root"></div> in your index.html file.
createRoot(...).render(...): Tells React to render your app inside that root div.
<BrowserRouter>: Wraps your app to enable routing.
<App />: This is your main component that gets rendered first.
*/

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
