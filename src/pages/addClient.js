import { useState } from "react";
import axios from "axios";

export const AddClient = () => {
  return (
    <div className="auth">
      <Add />
    </div>
  );
};

const Add = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault(); // when we submit the form it won't refresh the page
    try {
      await axios.post("http://localhost:8000/api/v1/clients/create", {
        name,
        email,
        phone,
        profileImg,
      });
      alert("Client added succesfully !");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      profileImg={profileImg}
      setProfileImg={setProfileImg}
      label="Add client"
      onSubmit={onSubmit}
    />
  );
};
const Form = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  profileImg,
  setProfileImg,
  onSubmit,
  label,
}) => {
  return (
    <div className="add-client">
      <h2>Add Client</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmfFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            id="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profileImg">ProfileImg: </label>
          <input
            type="file"
            id="profileImg"
            value={profileImg}
            onChange={(event) => setProfileImg(event.target.value)}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
