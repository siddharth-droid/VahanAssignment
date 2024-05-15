import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";

function Persons() {
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/persons");
      setPersons(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddPerson = async (formData) => {
    try {
      await axios.post("http://localhost:3000/api/persons", formData);
      fetchData(); // Fetch data after adding a person
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };

  const handleUpdatePerson = async (id, newData) => {
    if (
      !newData.name ||
      !newData.email ||
      !newData.mobileNumber ||
      !newData.dateOfBirth
    ) {
      setErrorMessage("All fields are required.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000); // Clear the error message after 3 seconds
      return;
    }
    try {
      await axios.put(`http://localhost:3000/api/persons/${id}`, newData);
      fetchData(); // Fetch data after updating a person
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  const handleDeletePerson = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/persons/${id}`);
      fetchData(); // Fetch data after deleting a person
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  return (
    <div>
      <h1
        className="text-center fw-bold mt-5 mb-4"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        Persons
      </h1>
      {errorMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}
      <PersonForm onAddPerson={handleAddPerson} />
      <PersonList
        persons={persons}
        onUpdatePerson={handleUpdatePerson}
        onDeletePerson={handleDeletePerson}
      />
    </div>
  );
}

export default Persons;
