import React, { useState, useEffect } from "react";
import Item from "../Item";

const ItemsList = () => {
  const [items, setItems] = useState([]); // State to store the items
  const [isLoading, setIsLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle any errors

  const [inputId, setInputId] = useState("");
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    console.log("Updated itemId=" + itemId);
  }, [itemId]); // This effect will run whenever itemId changes

  const handleSubmit = (event) => {
    event.preventDefault();
    // print inputId to console
    console.log("inputId=" + inputId);
    setItemId(Number(inputId)); // Convert inputId to a number
    console.log("itemId=" + itemId);
  };

  // Function to fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data); // Update the state with the fetched items data into the items array
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Items List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {items.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">ID</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.ID}
                className="transition-all duration-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4 border border-gray-300">{item.ID}</td>
                <td className="py-2 px-4 border border-gray-300">
                  {item.Name}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {item.Price}
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
      {/* Render the Item component if itemId is not null */}
      {itemId !== null && <Item id={itemId} />}
    </div>
  );
};

export default ItemsList;
