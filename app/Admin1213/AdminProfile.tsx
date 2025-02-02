import { useEffect, useState } from "react";

const AdminProfile = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch("https://requsest-response.vercel.app/api/admin-profile?email=admin@example.com");
          const data = await response.json();
          if (response.ok) {
            setEmail(data.email);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError("Server error. Please try again.");
        }
      };
  
      fetchProfile();
    }, []);
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p>Email: {email}</p>
      </div>
    );
  };
  
  export default AdminProfile;