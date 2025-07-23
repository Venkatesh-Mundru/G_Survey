/* 
This component is the admin interface of your app. It allows an admin to:
View all submitted survey data in a table
Download the data as a CSV file
Log out using the navbar
*/

import React, { useEffect, useState } from 'react';

import Navbar from '../Components/navbar';


/* 
Defines the AdminDashboard component.
Initializes data as an empty array to hold the survey submissions.
*/
function AdminDashboard() {
  const [data, setData] = useState([]);

  /* 
  This useEffect runs once when the component loads.
It sends a GET request to your backend to fetch all survey data.
The response is converted to JSON and stored in the data state.
  */
  useEffect(() => {
    fetch('http://localhost:3001/api/admin/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

/* 
This function is triggered when the Download CSV button is clicked.
It redirects the browser to the download URL, which triggers a file download.
*/
  const handleDownload = () => {
    window.location.href = 'http://localhost:3001/api/admin/download';
  };


  return (
    <>

      <Navbar showLogout={true} />
      <div className="dashboard-container">
        <h1>Survey Submissions</h1>
        <button className="download-btn" onClick={handleDownload}>Download CSV</button>

        
        <table border="1">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Nationality</th>
              <th>Marital Status</th>
              <th>Dependents</th>
              <th>Current Location</th>
              <th>Previous Location</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Language</th>
              <th>Displacement Date</th>
              <th>Conflict</th>
              <th>Disaster</th>
              <th>Development</th>
              <th>Other</th>
              <th>Other Reason</th>
              <th>Displacement Type</th>
              <th>Duration</th>
              <th>Water</th>
              <th>Sanitation</th>
              <th>Electricity</th>
              <th>Healthcare</th>
              <th>Education</th>
              <th>Safety</th>
              <th>Safety Concerns</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.fullName}</td>
                <td>{entry.gender}</td>
                <td>{entry.age}</td>
                <td>{entry.dob}</td>
                <td>{entry.nationality}</td>
                <td>{entry.marital}</td>
                <td>{entry.dependents}</td>
                <td>{entry.currentLocation}</td>
                <td>{entry.previousLocation}</td>
                <td>{entry.phone}</td>
                <td>{entry.email}</td>
                <td>{entry.language}</td>
                <td>{entry.displacementDate}</td>
                <td>{entry.reasonConflict ? 'Yes' : 'No'}</td>
                <td>{entry.reasonDisaster ? 'Yes' : 'No'}</td>
                <td>{entry.reasonDevelopment ? 'Yes' : 'No'}</td>
                <td>{entry.reasonOther ? 'Yes' : 'No'}</td>
                <td>{entry.reasonOtherText}</td>
                <td>{entry.displacementType}</td>
                <td>{entry.duration}</td>
                <td>{entry.accessWater ? 'Yes' : 'No'}</td>
                <td>{entry.accessSanitation ? 'Yes' : 'No'}</td>
                <td>{entry.accessElectricity ? 'Yes' : 'No'}</td>
                <td>{entry.accessHealthcare ? 'Yes' : 'No'}</td>
                <td>{entry.accessEducation ? 'Yes' : 'No'}</td>
                <td>{entry.accessSafety ? 'Yes' : 'No'}</td>
                <td>{entry.safetyConcerns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
