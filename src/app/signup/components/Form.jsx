"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import ErrorMessage from "./ErrorMessage";

const Form = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
    country: "Spain", // españita por defecto
    age: "",
    description: "",
    lookingFor: "",
    skillLevel: "",
    playTime: "Evenings", // por defecto
    preferredPlatform: "",
    games: [],
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.userEmail || !formData.password) {
      setError("Please complete all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "There was an error registering the user");
      }
    } catch (err) {
      setError("Connection error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Username"
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
      />
      <InputField
        label="Email"
        type="email"
        name="userEmail"
        value={formData.userEmail}
        onChange={handleChange}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <InputField
        label="Age"
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      <InputField
        label="Country"
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
      />
      <div id="select-lookFor">
        <label>Looking for</label>
        <select
          name="lookingFor"
          id="looking-for"
          value={formData.lookingFor}
          onChange={handleChange}
        >
          <option value="">Choose one</option>
          <option value="co-op">Co-op</option>
          <option value="PvP">PvP</option>
          <option value="casual">Casual</option>
        </select>
      </div>
      <div id="select-skill">
        <select
          name="skillLevel"
          id="skill-level"
          value={formData.skillLevel}
          onChange={handleChange}
        >
          <option value="">Choose one</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div id="select-platform">
        <select
          name="preferredPlatform"
          id="preferred-platform"
          value={formData.preferredPlatform}
          onChange={handleChange}
        >
          <option value="">Choose one</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
        </select>
      </div>
      <ErrorMessage message={error} />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Form;
