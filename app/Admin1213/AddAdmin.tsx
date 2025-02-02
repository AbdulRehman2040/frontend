import { useState } from "react";

const AddAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async () => {
      try {
        const response = await fetch("https://requsest-response.vercel.app/api/add-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Server error. Please try again.");
      }
    };
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Admin</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Add Admin
        </button>
      </div>
    );
  };
  
  export default AddAdmin;