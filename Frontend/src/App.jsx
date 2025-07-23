/* 
This file defines the main structure and routing of your React frontend. 
It tells React which component to show based on the current URL.
*/


/* 
This imports two components from the react-router-dom library:
Routes: A container for all your route definitions.
Route: Defines a single route (URL path) and the component to render for that path.
*/
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/login';
import AdminDashboard from './Pages/adminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
