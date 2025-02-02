import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { CgSearch } from 'react-icons/cg';
import { HiDownload } from 'react-icons/hi';
import { FaPrint } from 'react-icons/fa';

interface Buyer {
  _id: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  propertyTypeSelect: string;
  propertyCategory: string;
  areaRequired: string;
  budget: number;
  deposit: number;
  notes: string;
  propertyAvailableDate: string;
  FirstLineofAddress: string;
  postcode: string;
  propertyStatus: string;
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

const budgetRanges = [
  "£0-£1000",
  "£1001-£2000",
  "£2001-£3000",
  "£5001-£10,000",
  "£10,000+",
];

const BuyerList = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [filteredBuyers, setFilteredBuyers] = useState<Buyer[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [buyersPerPage] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBuyerId, setSelectedBuyerId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('');
  const [selectedPropertycategory, setSelectedPropertycategory] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<number | string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await axios.get('https://requsest-response.vercel.app/api/buyers');
        setBuyers(response.data);
        setFilteredBuyers(response.data);
      } catch (error) {
        setError('Failed to load Landlord.');
        toast.error('Failed to load Landlord.');
      }
    };

    fetchBuyers();
  }, []);

  const handleDelete = async () => {
    if (!selectedBuyerId) return;

    try {
      await axios.delete(`https://requsest-response.vercel.app/api/buyers/${selectedBuyerId}`);
      setBuyers(buyers.filter((buyer) => buyer._id !== selectedBuyerId));
      setShowModal(false);
      toast.success('Landlord deleted successfully!');
    } catch (error) {
      setError('Failed to delete Landlord.');
      toast.error('Failed to delete Landlord.');
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedBuyerId(id);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  
  const handleSubscribeStatus = async(buyerId:string, news: string )=>{
    try{
      await axios.put(`https://requsest-response.vercel.app/api/buyers/${buyerId}`,{
        subscriptionStatus: news,
      });
    
    setBuyers((prevBuyers) =>
      prevBuyers.map((buyer) =>
        buyer._id === buyerId ? { ...buyer, subscriptionStatus: news } : buyer
      )
    );
    toast.success("subscriptionStatus updated successfully!");
  } catch (error) {
    toast.error("Failed to update status.");
  }
  }


  const handleStatusChange = async (buyerId: string, newStatus: string) => {
      try {
        await axios.put(`https://requsest-response.vercel.app/api/buyers/${buyerId}`, {
          propertyStatus: newStatus,

        });
  
        setBuyers((prevBuyers) =>
          prevBuyers.map((buyer) =>
            buyer._id === buyerId ? { ...buyer, propertyStatus: newStatus } : buyer
          )
        );
  
        toast.success("Status updated successfully!");
      } catch (error) {
        toast.error("Failed to update status.");
      }
    }

  const handlePrint = () => {
    const printTable = `
      <html>
        <head>
          <title>Buyers List</title>
          <style type="text/css" media="print">
            @page { size: landscape; }
            body { font-family: sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .no-print { display: none; }
          </style>
        </head>
        <body>
          <h2>Landlord  List</h2>
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
                <th>Budget</th>
                <th>Deposit</th>
                <th>Notes</th>
                <th>Available Date</th>
                <th>Address</th>
                <th>Postcode</th>
                <th>Status</th>
                <th>Subscribe</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filteredBuyers.map((buyer, index) => `
                <tr key="${buyer._id}">
                  <td>${index + 1}</td>
                  <td>${new Date(buyer.formCreatedDate).toLocaleDateString()}</td>
                  <td>${buyer.name}</td>
                  <td>${buyer.phoneNumber}</td>
                  <td>${buyer.emailAddress}</td>
                  <td>${buyer.areaRequired}</td>
                  <td>${buyer.propertyTypeSelect}</td>
                  <td>${buyer.propertyCategory}</td>
                  <td>£${buyer.budget}</td>
                  <td>£${buyer.deposit}</td>
                  <td>${buyer.notes}</td>
                  <td>${new Date(buyer.propertyAvailableDate).toLocaleDateString()}</td>
                  <td>${buyer.FirstLineofAddress}</td>
                  <td>${buyer.postcode}</td>
                  <td>${buyer.propertyStatus}</td>
                  <td>${buyer.subscriptionStatus}</td>
                  <td>
                    <button class="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printTable);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    } else {
      toast.error("Could not open print window. Please allow pop-ups.");
    }
  };

  const handleExportToExcel = () => {
    const buyersData = filteredBuyers.map((buyer) => ({
      Name: buyer.name,
      Phone: buyer.phoneNumber,
      Email: buyer.emailAddress,
      Area: buyer.areaRequired,
      'Property Type': buyer.propertyTypeSelect,
      propertyCategory: buyer.propertyCategory,
      Budget: `£${buyer.budget}`,
      deposit: `${buyer.deposit}`,
      Notes: buyer.notes,
      'Available Date': new Date(buyer.propertyAvailableDate).toLocaleDateString(),
      Address: buyer.FirstLineofAddress,
      Postcode: buyer.postcode,
      formCreatedDate: buyer.formCreatedDate,
      Status: buyer.propertyStatus,
      subscriptionStatus: buyer.subscriptionStatus
    }));

    const ws = XLSX.utils.json_to_sheet(buyersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Buyers');
    XLSX.writeFile(wb, 'buyers.xlsx');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setFilteredBuyers(buyers);
    } else {
      const filtered = buyers.filter((buyer) =>
        buyer.name.toLowerCase().includes(value.toLowerCase()) ||
        buyer.emailAddress.toLowerCase().includes(value.toLowerCase()) ||
        buyer.areaRequired.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBuyers(filtered);
    }
  };

  const handleFilterChange = () => {
    let filtered = buyers;

    if (searchTerm) {
      filtered = filtered.filter((buyer) =>
        buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        buyer.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        buyer.areaRequired.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedArea) {
      filtered = filtered.filter((buyer) => buyer.areaRequired === selectedArea);
    }

    if (selectedPropertycategory) {
      filtered = filtered.filter((buyer) => buyer.propertyCategory === selectedPropertycategory);
    }

    if (selectedPropertyType) {
      filtered = filtered.filter((buyer) => buyer.propertyTypeSelect === selectedPropertyType);
    }

    if (selectedBudget) {
      switch (selectedBudget) {
        case "£0-£1000":
          filtered = filtered.filter((buyer) => buyer.budget >= 0 && buyer.budget <= 1000);
          break;
        case "£1001-£2000":
          filtered = filtered.filter((buyer) => buyer.budget > 1000 && buyer.budget <= 2000);
          break;
        case "£2001-£3000":
          filtered = filtered.filter((buyer) => buyer.budget > 2000 && buyer.budget <= 3000);
          break;
        case "£5001-£10,000":
          filtered = filtered.filter((buyer) => buyer.budget > 5000 && buyer.budget <= 10000);
          break;
        case "£10,000+":
          filtered = filtered.filter((buyer) => buyer.budget > 10000);
          break;
        default:
          break;
      }
    }

    if (selectedStatus) {
      filtered = filtered.filter((buyer) => buyer.propertyStatus === selectedStatus);
    }

    setFilteredBuyers(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [searchTerm, selectedArea, selectedPropertyType, selectedPropertycategory, selectedBudget, selectedStatus, buyers]);

  const indexOfLastBuyer = currentPage * buyersPerPage;
  const indexOfFirstBuyer = indexOfLastBuyer - buyersPerPage;
  const currentBuyers = filteredBuyers.slice(indexOfFirstBuyer, indexOfLastBuyer);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Landlord List</h2>
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
          <option value=""> Area</option>
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
          <option value=""> Property Type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedPropertycategory}
          onChange={(e) => setSelectedPropertycategory(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value=""> Property Category</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
          <option value="Land">Land</option>
        </select>

        <select
          value={selectedBudget}
          onChange={(e) => setSelectedBudget(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value="">Budget</option>
          {budgetRanges.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
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
              <th className="border px-2 py-1">Property Category</th>
              <th className="border px-2 py-1">Property Type</th>
              <th className="border px-2 py-1">Budget</th>
              <th className="border px-2 py-1">Deposit</th>
              <th className="border px-2 py-1">Notes</th>
              <th className="border px-2 py-1">Available Date</th>
              <th className="border px-2 py-1">Address</th>
              <th className="border px-2 py-1">Postcode</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Subscribe</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBuyers.map((buyer, index) => (
              <tr key={buyer._id}>
                <td className="border px-2 py-1">{index + 1 + (currentPage - 1) * buyersPerPage}</td>
                <td className="border px-2 py-1">{new Date(buyer.formCreatedDate).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{buyer.name}</td>
                <td className="border px-2 py-1">{buyer.phoneNumber}</td>
                <td className="border px-2 py-1">{buyer.emailAddress}</td>
                <td className="border px-2 py-1">{buyer.areaRequired}</td>
                <td className="border px-2 py-1">{buyer.propertyCategory}</td>
                <td className="border px-2 py-1">{buyer.propertyTypeSelect}</td>
                <td className="border px-2 py-1">£{buyer.budget}</td>
                <td className="border px-2 py-1">£{buyer.deposit}</td>
                <td className="border px-2 py-1">{buyer.notes}</td>
                <td className="border px-2 py-1">{new Date(buyer.propertyAvailableDate).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{buyer.FirstLineofAddress}</td>
                <td className="border px-2 py-1">{buyer.postcode}</td>
                <td className="border px-2 py-1">
                  <select
                    value={buyer.propertyStatus}
                    onChange={(e) => handleStatusChange(buyer._id, e.target.value)}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="non-active">Non-Active</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <select
                    value={buyer.subscriptionStatus}
                    onChange={(e) => handleSubscribeStatus(buyer._id, e.target.value)}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="Subscribed">Subscribed</option>
                    <option value="UnSubscribed">UnSubscribed</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => confirmDelete(buyer._id)}
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
          disabled={currentPage * buyersPerPage >= filteredBuyers.length}
        >
          Next
        </button>
      </div>

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <p>Are you sure you want to delete this buyer?</p>
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

export default BuyerList;