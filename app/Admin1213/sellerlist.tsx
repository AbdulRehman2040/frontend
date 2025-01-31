import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { CgSearch } from 'react-icons/cg';
import { HiDownload } from 'react-icons/hi';
import { FaPrint } from 'react-icons/fa';

interface Seller {
  _id: string;
  landlordName: string;
  landlordPhoneNumber: string;
  landlordEmailAddress: string;
  propertyCategory: string;
  landlordPropertyType: string;
  landlordPropertyAddress: string;
  Size: string;
  landlordRent: string;
  propertyStatus: string;
  notes: string;
  formCreatedDate: string;
  subscriptionStatus: string;
}

const areas = [
  "Aireborough", "Baildon", "Bingley", "Bradford", "Brighouse", "Castleford", 
  "Colne Valley", "Denby Dale", "Denholme", "Dewsbury", "Elland", "Featherstone", 
  "Halifax", "Hebden Royd", "Heckmondwike", "Hemsworth", "Holmfirth", "Huddersfield", 
  "Ilkley", "Keighley", "Knottingley", "Leeds", "Meltham", "Mirfield", "Morley", 
  "Normanton", "Ossett", "Otley", "Pontefract", "Pudsey", "Queensbury and Shelf", 
  "Ripponden", "Rothwell", "Shipley", "Silsden", "Skipton", "Spenborough", "Stanley", 
  "Tadcaster", "Todmorden", "Wakefield", "Wetherby", "Wharfedale", "Other"
];

const propertyTypes = [
  "Cafe", "Car Wash", "Factory", "Healthcare", "Hotel", "Medical Center", "Nursing Homes", 
  "Office", "Pub", "Restaurant", "Retail", "Shops", "Shopping Center", "Sports Facilities", 
  "Unit", "Warehouse", "Other"
];

const sizes = [
  "0-1000 sq. ft.",
  "1000-2000 sq. ft.",
  "2000-3000 sq. ft.",
  "5000-10000 sq. ft.",
  "10000-20000 sq. ft.",
  "20000 sq. ft. +"
];

const rentRanges = [
  "£0-£1000",
  "£1001-£2000",
  "£2001-£3000",
  "£5001-£10,000",
  "£10,000+",
];

const propertyStatuses = ["active", "non-active"];

const SellerList = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [filteredSellers, setFilteredSellers] = useState<Seller[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sellersPerPage] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('');
  const [selectedPropertyCategory, setSelectedPropertyCategory] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedRent, setSelectedRent] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('https://requsest-response.vercel.app/api/sellers');
        setSellers(response.data);
        setFilteredSellers(response.data);
      } catch (error) {
        setError('Failed to load sellers.');
        toast.error('Failed to load sellers.');
      }
    };

    fetchSellers();
  }, []);

  const handleDelete = async () => {
    if (!selectedSellerId) return;

    try {
      await axios.delete(`https://requsest-response.vercel.app/api/sellers/${selectedSellerId}`);
      setSellers(sellers.filter((seller) => seller._id !== selectedSellerId));
      setShowModal(false);
      toast.success('Seller deleted successfully!');
    } catch (error) {
      setError('Failed to delete seller.');
      toast.error('Failed to delete seller.');
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedSellerId(id);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const printTable = `
        <html>
          <head>
            <title>Sellers List</title>
            <style type="text/css" media="print">
              @page { size: landscape; }
              body { font-family: sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .no-print { display: none; }
            </style>
          </head>
          <body>
            <h2>Tenant List</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Created Date</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Area</th>
                  <th>Property Type</th>
                  <th>Property Category</th>
                  <th>Size</th>
                  <th>Rent</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Subscribe</th>
                </tr>
              </thead>
              <tbody>
                ${filteredSellers
                  .map(
                    (seller, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${new Date(seller.formCreatedDate).toLocaleDateString()}</td>
                    <td>${seller.landlordName}</td>
                    <td>${seller.landlordPhoneNumber}</td>
                    <td>${seller.landlordEmailAddress}</td>
                    <td>${seller.landlordPropertyAddress}</td>
                    <td>${seller.landlordPropertyType}</td>
                    <td>${seller.propertyCategory}</td>
                    <td>${seller.Size}</td>
                    <td>${seller.landlordRent}</td>
                    <td>${seller.notes}</td>
                    <td>${seller.propertyStatus}</td>
                    <td>${seller.subscriptionStatus}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;
  
      printWindow.document.write(printTable);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    } else {
      console.error("Could not open print window.");
      toast.error("Could not open print window. Please allow pop-ups.");
    }
  };

  const handleStatusChange = async (sellerId: string, newStatus: string) => {
    try {
      await axios.put(`https://requsest-response.vercel.app/api/sellers/${sellerId}`, {
        propertyStatus: newStatus,
      });

      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller._id === sellerId ? { ...seller, propertyStatus: newStatus } : seller
        )
      );

      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleSubscribeStatus = async (sellerId: string, news: string) => {
    try {
      await axios.put(`https://requsest-response.vercel.app/api/sellers/${sellerId}`, {
        subscriptionStatus: news,
      });

      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller._id === sellerId ? { ...seller, subscriptionStatus: news } : seller
        )
      );

      toast.success("Subscription status updated successfully!");
    } catch (error) {
      toast.error("Failed to update subscription status.");
    }
  };

  const handleExportToExcel = () => {
    const sellersData = filteredSellers.map((seller) => ({
      Name: seller.landlordName,
      Phone: seller.landlordPhoneNumber,
      Email: seller.landlordEmailAddress,
      Area: seller.landlordPropertyAddress,
      'Property Type': seller.landlordPropertyType,
      'Property Category': seller.propertyCategory,
      Size: seller.Size,
      Rent: seller.landlordRent,
      Notes: seller.notes,
      'Available Date': new Date(seller.formCreatedDate).toLocaleDateString(),
      Status: seller.propertyStatus,
      'Subscription Status': seller.subscriptionStatus
    }));

    const ws = XLSX.utils.json_to_sheet(sellersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sellers');

    XLSX.writeFile(wb, 'sellers.xlsx');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setFilteredSellers(sellers);
    } else {
      const filtered = sellers.filter((seller) => {
        return (
          seller.landlordName.toLowerCase().includes(value.toLowerCase()) ||
          seller.landlordEmailAddress.toLowerCase().includes(value.toLowerCase()) ||
          seller.landlordPropertyAddress.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredSellers(filtered);
    }
  };

  const handleFilterChange = () => {
    let filtered = sellers;

    if (searchTerm) {
      filtered = filtered.filter((seller) =>
        seller.landlordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.landlordEmailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.landlordPropertyAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedArea) {
      filtered = filtered.filter((seller) => seller.landlordPropertyAddress === selectedArea);
    }

    if (selectedPropertyCategory) {
      filtered = filtered.filter((seller) => seller.propertyCategory === selectedPropertyCategory);
    }

    if (selectedPropertyType) {
      filtered = filtered.filter((seller) => seller.landlordPropertyType === selectedPropertyType);
    }

    if (selectedSize) {
      filtered = filtered.filter((seller) => seller.Size === selectedSize);
    }

    if (selectedRent) {
      filtered = filtered.filter((seller) => seller.landlordRent === selectedRent);
    }

    if (selectedStatus) {
      filtered = filtered.filter((seller) => seller.propertyStatus === selectedStatus);
    }

    setFilteredSellers(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [searchTerm, selectedArea, selectedPropertyType, selectedPropertyCategory, selectedSize, selectedRent, selectedStatus, sellers]);

  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirstSeller, indexOfLastSeller);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Tenant List</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Bar and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="flex items-center bg-white border rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-500 w-full md:w-auto">
          <CgSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name, email, or area"
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 ml-2"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleExportToExcel}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center space-x-2 transition duration-300"
          >
            <HiDownload />
            <span>Export to Excel</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 transition duration-300"
          >
            <FaPrint />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value="">Select Area</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        <select
          value={selectedPropertyType}
          onChange={(e) => setSelectedPropertyType(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value="">Select Property Type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedPropertyCategory}
          onChange={(e) => setSelectedPropertyCategory(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value="">Select Property Category</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
          <option value="Land">Land</option>
        </select>

        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value="">Select Size</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <select
          value={selectedRent}
          onChange={(e) => setSelectedRent(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value="">Select Rent</option>
          {rentRanges.map((rent) => (
            <option key={rent} value={rent}>
              {rent}
            </option>
          ))}
        </select>

        
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr>
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Created Date</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Area</th>
              <th className="border px-2 py-1">Property Type</th>
              <th className="border px-2 py-1">Property Category</th>
              <th className="border px-2 py-1">Size</th>
              <th className="border px-2 py-1">Rent</th>
              <th className="border px-2 py-1">Notes</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Subscribe</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSellers.map((seller, index) => (
              <tr key={seller._id}>
                <td className="border px-2 py-1">{index + 1 + (currentPage - 1) * sellersPerPage}</td>
                <td className="border px-2 py-1">{new Date(seller.formCreatedDate).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{seller.landlordName}</td>
                <td className="border px-2 py-1">{seller.landlordPhoneNumber}</td>
                <td className="border px-2 py-1">{seller.landlordEmailAddress}</td>
                <td className="border px-2 py-1">{seller.landlordPropertyAddress}</td>
                <td className="border px-2 py-1">{seller.landlordPropertyType}</td>
                <td className="border px-2 py-1">{seller.propertyCategory}</td>
                <td className="border px-2 py-1">{seller.Size}</td>
                <td className="border px-2 py-1">{seller.landlordRent}</td>
                <td className="border px-2 py-1">{seller.notes}</td>
                <td className="border px-2 py-1">
                  <select
                    value={seller.propertyStatus}
                    onChange={(e) => handleStatusChange(seller._id, e.target.value)}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="non-active">Non-Active</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <select
                    value={seller.subscriptionStatus || "Subscribed"}
                    className="px-2 py-1 border rounded"
                    onChange={(e) => handleSubscribeStatus(seller._id, e.target.value)}
                  >
                    <option value="Subscribed">Subscribed</option>
                    <option value="UnSubscribed">UnSubscribed</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => confirmDelete(seller._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * sellersPerPage >= filteredSellers.length}
        >
          Next
        </button>
      </div>

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <p>Are you sure you want to delete this seller?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SellerList;