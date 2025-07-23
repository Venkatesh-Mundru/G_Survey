/* 
This component is the core of your frontend form. 
It collects detailed information from displaced community members and sends it to your backend to be stored in the database.
*/

import './surveyForm.css';

/* 
Imports the useState hook from React.
This hook lets you store and update form data as the user types.
*/
import { useState } from 'react';

function SurveyForm() {
  /* 
  This creates a state object called formData to hold all the form fields.
Each key represents a field in the form.
setFormData is used to update the values when the user interacts with the form.
  */
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    dob: '',
    nationality: '',
    marital: '',
    dependents: '',
    currentLocation: '',
    previousLocation: '',
    phone: '',
    email: '',
    language: '',
    displacementDate: '',
    displacementReasons: [],
    otherReason: '',
    displacementType: '',
    durationOfStay: '',
    services: [],
    safetyConcerns: ''
  });

  /* 
   This function runs whenever a form input changes.
   It extracts the input's name, value, type, and checked status.
  */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'displacementReasons') {
      setFormData(prev => ({
        ...prev,
        displacementReasons: checked
          ? [...prev.displacementReasons, value]
          : prev.displacementReasons.filter(item => item !== value)
      }));
    } else if (type === 'checkbox' && name === 'services') {
      setFormData(prev => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  //Prevents the default form submission behavior (page reload).
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Sends the form data to your backend using a POST request to /api/form.
    const res = await fetch('http://localhost:3001/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert('Form submitted successfully!');
    } else {
      alert('Submission failed.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Displaced Community Member Information Form</h1>

        <fieldset>
          <legend>Section 1: Personal Information</legend>
          <label>Full Name</label>
          <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} required />
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <br />
          <label>Age</label>
          <input name="age" type="number" value={formData.age} onChange={handleChange} />
          <label>Date of Birth</label>
          <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
          <label>Nationality</label>
          <input name="nationality" type="text" value={formData.nationality} onChange={handleChange} />
          <label>Marital Status</label>
          <select name="marital" value={formData.marital} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
            <option value="Divorced">Divorced</option>
          </select>
          <br />
          <label>Number of Dependents</label>
          <input name="dependents" type="number" value={formData.dependents} onChange={handleChange} />
        </fieldset>

        <fieldset>
          <legend>Section 2: Contact & Location</legend>
          <label>Current Location</label>
          <input name="currentLocation" type="text" value={formData.currentLocation} onChange={handleChange} />
          <label>Previous Location</label>
          <input name="previousLocation" type="text" value={formData.previousLocation} onChange={handleChange} />
          <label>Phone Number</label>
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} />
          <label>Preferred Language</label>
          <input name="language" type="text" value={formData.language} onChange={handleChange} />
        </fieldset>

        <fieldset>
          <legend>Section 3: Displacement Details</legend>
          <label>Date of Displacement</label>
          <input name="displacementDate" type="date" value={formData.displacementDate} onChange={handleChange} />
          <label>Reason for Displacement</label>
          <label><input type="checkbox" name="displacementReasons" value="Conflict/Violence" onChange={handleChange} /> Conflict/Violence</label>
          <label><input type="checkbox" name="displacementReasons" value="Natural Disaster" onChange={handleChange} /> Natural Disaster</label>
          <label><input type="checkbox" name="displacementReasons" value="Development Project" onChange={handleChange} /> Development Project</label>
          <label><input type="checkbox" name="displacementReasons" value="Other" onChange={handleChange} /> Other</label>
          <input name="otherReason" type="text" placeholder="If Other, please specify" value={formData.otherReason} onChange={handleChange} />
          <label>Type of Displacement</label>
          <select name="displacementType" value={formData.displacementType} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Internally Displaced">Internally Displaced</option>
            <option value="Refugee">Refugee</option>
          </select>
          <br />
          <label>Duration of Stay in Current Location</label>
          <input name="durationOfStay" type="text" value={formData.durationOfStay} onChange={handleChange} />
        </fieldset>


        <fieldset>
          <legend>Section 4: Living Conditions</legend>
          <label>Access to Basic Services</label>
          <label><input type="checkbox" name="services" value="Water" onChange={handleChange} /> Water</label>
          <label><input type="checkbox" name="services" value="Sanitation" onChange={handleChange} /> Sanitation</label>
          <label><input type="checkbox" name="services" value="Electricity" onChange={handleChange} /> Electricity</label>
          <label><input type="checkbox" name="services" value="Healthcare" onChange={handleChange} /> Healthcare</label>
          <label><input type="checkbox" name="services" value="Education" onChange={handleChange} /> Education</label>
          <label><input type="checkbox" name="services" value="Safety Concerns" onChange={handleChange} /> Safety Concerns</label>
          <textarea name="safetyConcerns" placeholder="If yes, please describe safety concerns" value={formData.safetyConcerns} onChange={handleChange}></textarea>
        </fieldset>
        <fieldset>
      <legend>Section 5: Education & Skills</legend>
      <label for="Education">Highest Level of Education</label>
      <input type="text" placeholder="Highest Level of Education Completed" />
      <label for="language">language Spoken</label>
      <input type="text" placeholder="Languages Spoken" />
      <label for="skill">Skills You Have</label>
      <input type="text" placeholder="Skills You Have" />
      <label for="skill">Skills you want to learn</label>
      <input type="text" placeholder="Skills You Want to Learn" />
      
      
    </fieldset>
 

        

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SurveyForm;
