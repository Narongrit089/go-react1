import React, { useState, useEffect } from "react";

const StudentsList = () => {
  const [students, setStudents] = useState([]); // State to store the items
  const [isLoading, setIsLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle any errors

  // Function to fetch items from the API
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data); // Update the state with the fetched items data into the items array
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {students.map((student) => (
          <li key={student.ID}>
            Code = {student.Code} Name = {student.Name}
          </li> // Assuming each item has an id and name
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;
