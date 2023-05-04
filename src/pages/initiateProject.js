import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

export const InitiateProject = () => {
  return (
    <div className="auth">
      <Initiate />
    </div>
  );
};

const Initiate = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState("");
  const [isNewClient, setIsNewClient] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImg: "",
  });
  const [team, setTeam] = useState([]);
  const [productionManager, setProductionManager] = useState("");
  const [ProductionManagers, setProductionManagers] = useState([]);
  const [notes, setNotes] = useState("");

  const addEmployeeToTeam = () => {
    if (selectedEmployee && !team.includes(selectedEmployee)) {
      setTeam([...team, selectedEmployee]);
      setSelectedEmployee("");
    }
  };

  const removeEmployee = (employeeId) => {
    if (team.length > 0) {
      const newTeam = team.filter((id) => id !== employeeId);
      setTeam(newTeam);
    }
  };

  const handleRadioChange = (event) => {
    setIsNewClient(event.target.value === "New");
  };

  const handleNewClientChange = (event) => {
    const { value, name } = event.target;
    setNewClientData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    console.log(name, description, client, team, productionManager, notes);
  }, [name, description, client, team, productionManager, notes]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/users/employees"
      );
      setEmployees(response.data?.employees);
    };
    fetchEmployees();
    const fetchClients = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/clients");
      setClients(response.data?.Clients);
    };
    fetchClients();
    const fetchManagers = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/users/managers"
      );
      setProductionManagers(response.data?.managers);
    };
    fetchManagers();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isNewClient === true) {
        const response = await axios.post(
          "http://localhost:8000/api/v1/clients/create",
          {
            name,
            description,
            client,
            team,
            productionManager,
            notes,
            email: newClientData.email,
            phone: newClientData.phone,
          }
        );
        setClient(response.Client._id);
      }
      await axios.post("http://localhost:8000/api/v1/projects/create", {
        name,
        description,
        client,
        team,
        productionManager,
        notes,
      });
      setName("");
      setDescription("");
      setClient("");
      setTeam([]);
      setProductionManager("");
      setNotes("");
      alert("Project Initiated succesfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      employees={employees}
      selectedEmployee={selectedEmployee}
      setSelectedEmployee={setSelectedEmployee}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      clients={clients}
      client={client}
      setClient={setClient}
      isNewClient={isNewClient}
      setIsNewClient={setIsNewClient}
      newClientData={newClientData}
      team={team}
      setTeam={setTeam}
      productionManager={productionManager}
      setProductionManager={setProductionManager}
      ProductionManagers={ProductionManagers}
      notes={notes}
      addEmployeeToTeam={addEmployeeToTeam}
      removeEmployee={removeEmployee}
      handleNewClientChange={handleNewClientChange}
      handleRadioChange={handleRadioChange}
      setNotes={setNotes}
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  employees,
  selectedEmployee,
  setSelectedEmployee,
  name,
  setName,
  description,
  setDescription,
  client,
  setClient,
  clients,
  isNewClient,
  newClientData,
  team,
  productionManager,
  setProductionManager,
  ProductionManagers,
  notes,
  setNotes,
  addEmployeeToTeam,
  removeEmployee,
  handleRadioChange,
  handleNewClientChange,
  onSubmit,
  label = "Initiate Project",
}) => {
  return (
    <div className="add-client">
      <h2>Initiate Project</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter project name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="client">Client:</label>

          {!isNewClient && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <select
                value={client}
                onChange={(event) => setClient(event.target.value)}
              >
                <option value="">Choose an existing Client</option>
                {clients.map((client) => (
                  <option value={client._id} key={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <label htmlFor="isNewClient">
                <input
                  type="radio"
                  name="isNewClient"
                  id="isNewClient"
                  value="New"
                  checked={isNewClient}
                  onChange={handleRadioChange}
                />
                Add a new client
              </label>
            </div>
          )}

          {isNewClient && (
            <div className="form-group">
              <label htmlFor="newClientData.name">Client Name:</label>
              <input
                type="text"
                id="newClientData.name"
                name="name"
                placeholder="Enter client name"
                value={newClientData.name}
                onChange={handleNewClientChange}
                required
              />

              <label htmlFor="Cemail">Client Email:</label>
              <input
                type="text"
                id="newClientData.email"
                name="email"
                placeholder="Enter client email"
                value={newClientData.email}
                onChange={handleNewClientChange}
                required
              />
              <label htmlFor="newClientData.phone">Client Phone Number:</label>
              <input
                type="text"
                id="newClientData.phone"
                name="phone"
                placeholder="Enter client phone"
                value={newClientData.phone}
                onChange={handleNewClientChange}
                required
              />
              <label htmlFor="newClientData.image">Client image:</label>
              <input
                type="file"
                id="newClientData.image"
                name="image"
                value={newClientData.image}
                onChange={handleNewClientChange}
              />
              <label htmlFor="existing-client">
                <input
                  type="radio"
                  id="existing-client"
                  name="client-type"
                  value="existing"
                  checked={!isNewClient}
                  onChange={handleRadioChange}
                />
                Choose an existing client
              </label>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="team">Team: </label>
          <select
            className="form-control"
            value={selectedEmployee}
            onChange={(event) => setSelectedEmployee(event.target.value)}
          >
            <option value="">Choose an employee</option>
            {employees.map((employee) => (
              <option value={employee._id} key={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
          <button
            onClick={(event) => {
              event.preventDefault();
              addEmployeeToTeam();
            }}
          >
            Add
          </button>
          {team.length > 0 && (
            <div>
              <p>Selected Employees:</p>
              <ul>
                {team.map((employeeId) => {
                  const employee = employees.find((e) => e._id === employeeId);
                  return employee ? (
                    <li key={employee._id}>
                      {employee.name}
                      <button onClick={() => removeEmployee(employee._id)}>
                        Delete
                      </button>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="productionManager">productionManager: </label>
          <select
            className="form-group"
            value={productionManager}
            onChange={(event) => setProductionManager(event.target.value)}
            required
          >
            <option value="">Production Managers</option>
            {ProductionManagers.map((manager) => (
              <option value={manager._id} key={manager._id}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
