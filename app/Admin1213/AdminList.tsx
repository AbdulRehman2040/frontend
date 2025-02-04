import { useEffect, useState } from "react";

interface Admin {
  serial: number;
  _id: string;
  username: string;
  email: string;
  createdDate: string;
}

const AdminList = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("https://requsest-response.vercel.app/api/admins");
        if (!response.ok) {
          throw new Error("Failed to fetch admin data");
        }
        const data = await response.json();

        const formattedData = data.map((admin: any, index: number) => ({
          serial: index + 1,
          _id: admin._id,
          email: admin.email,
          username: admin.username,
          createdDate: new Date(parseInt(admin._id.substring(0, 8), 16) * 1000).toLocaleString(),
        }));

        setAdmins(formattedData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleDeleteClick = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAdmin) return;

    try {
      const response = await fetch(`https://requsest-response.vercel.app/admins/${selectedAdmin._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }

      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin._id !== selectedAdmin._id));
      setIsModalOpen(false);
    } catch (error) {
      alert(`❌ Error: ${(error as Error).message}`);
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin List</h2>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Serial No</th>
              <th className="border p-2">Created Date</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border">
                <td className="border p-2 text-center">{admin.serial}</td>
                <td className="border p-2">{admin.createdDate}</td>
                <td className="border p-2">{admin.username}</td>
                <td className="border p-2">{admin.email}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDeleteClick(admin)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-friendly cards */}
      <div className="md:hidden space-y-4">
        {admins.map((admin) => (
          <div key={admin._id} className="border rounded-lg p-4 shadow-md bg-white">
            <p className="text-lg font-semibold">#{admin.serial}</p>
            <p className="text-gray-700"><strong>Name:</strong> {admin.username}</p>
            <p className="text-gray-700"><strong>Email:</strong> {admin.email}</p>
            <p className="text-gray-700"><strong>Created Date:</strong> {admin.createdDate}</p>
            <button
              onClick={() => handleDeleteClick(admin)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-center">Are you sure?</h3>
            <p className="mb-4 text-sm text-gray-600 text-center">This action cannot be undone.</p>
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminList;
