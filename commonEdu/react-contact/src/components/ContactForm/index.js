import React, { useState } from "react";
import axios from "axios";

const ContactForm = (props) => {
  const { contactInfo: prevContactInfo } = props;

  const [contactInfo, setContactInfo] = useState({
    id: prevContactInfo.id,
    name: prevContactInfo.name,
    age: prevContactInfo.age,
    phoneNumber: prevContactInfo.phoneNumber,
    email: prevContactInfo.email,
    description: prevContactInfo.description,
  });

  const handleChange = (field) => (e) => {
    setContactInfo({
      ...contactInfo,
      [field]: e.target.value,
    });
  };

  const creactContact = () => {
    const { name, age, phoneNumber, email, description } = contactInfo;

    if ((((!name == !phoneNumber) == !email) == !age) == !description) return;
    const url = "http://localhost:3000/user/add";
    const data = {
      name,
      age: Number(age),
      phoneNumber,
      email,
      description,
    };

    axios({
      method: "POST",
      url,
      data,
    }).then((res) => {
      setContactInfo({
        id: null,
        name: "",
        age: "",
        phoneNumber: "",
        email: "",
        description: "",
      });
    });
  };

  const updateContact = () => {
    const { id, name, age, phoneNumber, email, description } = contactInfo;
    const url = `http://localhost:3000/user/upd/${id}`;
    const data = {
      name,
      age: Number(age),
      phoneNumber,
      email,
      description,
    };

    axios({
      method: "PUT",
      url,
      data,
    }).then((res) => {
      setContactInfo({
        id: null,
        name: "",
        age: "",
        phoneNumber: "",
        email: "",
        description: "",
      });
    });
  };
  const handleClickSave = () => {
    const {
      contactInfo: { id },
    } = props;

    if (id) {
      updateContact();
    } else {
      creactContact();
    }
  };

  return (
    <div
      style={{
        border: "3px dashed orange",
        width: "155px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        value={contactInfo.name}
        placeholder="name"
        onChange={handleChange("name")}
      />
      <br />
      <input
        type="text"
        value={contactInfo.age}
        placeholder="age"
        onChange={handleChange("age")}
      />
      <br />
      <input
        type="text"
        value={contactInfo.phoneNumber}
        placeholder="phoneNumber"
        onChange={handleChange("phoneNumber")}
      />
      <br />
      <input
        type="text"
        value={contactInfo.email}
        placeholder="email"
        onChange={handleChange("email")}
      />
      <br />
      <input
        type="text"
        value={contactInfo.description}
        placeholder="description"
        onChange={handleChange("description")}
      />
      <br />
      <button onClick={handleClickSave}>저장</button>
    </div>
  );
};

// id는 기본값을 지정해 주어야함 (위에서 선언한적이 없기 때문에)
ContactForm.defaultProps = {
  contactInfo: {
    id: null,
  },
};

export default ContactForm;
