import React, { useState, useEffect } from "react";
import Student from "../Student";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [inputId, setInputId] = useState("");
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    console.log("Updated StudentId=" + studentId);
  }, [studentId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inputId=" + inputId);
    setStudentId(Number(inputId));
    console.log("itemId=" + studentId);
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data);
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Students List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {students.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">ID</th>
              <th className="py-2 px-4 border border-gray-300">Code</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.ID}
                className="transition-all duration-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4 border border-gray-300">
                  {student.ID}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {student.Code}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {student.Name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />

      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block">
          Enter Student ID:
          <input
            type="number"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            className="block w-full mt-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
      {studentId !== null && <Student id={studentId} />}
    </div>
  );
};

export default StudentsList;
