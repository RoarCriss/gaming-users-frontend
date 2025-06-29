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
        const data = await res.json;
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
        label="Username"
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
      />
    </form>
  );
};
