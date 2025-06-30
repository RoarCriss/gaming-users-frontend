"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import ErrorMessage from "./ErrorMessage";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "Spain", // españita por defecto
    age: "",
    description: "",
    looking_for: "",
    skill_level: "",
    play_time: "Evenings", // por defecto
    preferred_platform: "",
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

    if (!formData.username || !formData.email || !formData.password) {
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
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
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
          name="looking_for"
          id="looking-for"
          value={formData.looking_for}
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
          name="skill_level"
          id="skill-level"
          value={formData.skill_level}
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
          name="preferred_platform"
          id="preferred-platform"
          value={formData.preferred_platform}
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
