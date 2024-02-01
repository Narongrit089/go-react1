import React, { useState, useEffect } from "react";
import Subject from "../Subject";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [inputId, setInputId] = useState("");
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    console.log("Updated itemId=" + itemId);
  }, [itemId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inputId=" + inputId);
    setItemId(Number(inputId)); // Convert inputId to a number
    console.log("itemId=" + itemId);
    setInputId(""); // Clear input after submission
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/subjects");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Subjects List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {subjects.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">ID</th>
              <th className="py-2 px-4 border border-gray-300">Code</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr
                key={subject.ID}
                className="transition-all duration-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4 border border-gray-300">
                  {subject.ID}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {subject.Code}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {subject.Name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />

      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block">
          Enter Item ID:
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
      {itemId !== null && <Subject id={itemId} />}
    </div>
  );
};

export default SubjectsList;
