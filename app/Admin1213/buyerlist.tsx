import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for Toastify
import * as XLSX from 'xlsx'
import { CgSearch } from 'react-icons/cg';
import { AiOutlineDownload } from 'react-icons/ai';
import { HiDownload } from 'react-icons/hi';
import { FaPrint } from 'react-icons/fa';

interface Buyer {
  _id: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  propertyTypeSelect: string;
  propertyCategory:string;
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
]; // Example budget ranges

const propertyStatuses = ["active", "non-active"]; // Example property statuses

const BuyerList = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [filteredBuyers, setFilteredBuyers] = useState<Buyer[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [buyersPerPage] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBuyerId, setSelectedBuyerId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>(''); // Area filter
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('');
  const [selectedPropertycategory, setSelectedPropertycategory] = useState<string>(''); // Property type filter
  const [selectedBudget, setSelectedBudget] = useState<number | string>(''); // Budget filter
  const [selectedStatus, setSelectedStatus] = useState<string>('active'); // Property status filter

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await axios.get('https://requsest-response.vercel.app/api/buyers');
        setBuyers(response.data);
        setFilteredBuyers(response.data); // Initially show all buyers
      } catch (error) {
        setError('Failed to load buyers.');
        toast.error('Failed to load buyers.');
      }
    };

    fetchBuyers();
  }, []);

  // Handle deletion of buyer
  const handleDelete = async () => {
    if (!selectedBuyerId) return;

    try {
      await axios.delete(`https://requsest-response.vercel.app/api/buyers/${selectedBuyerId}`);
      setBuyers(buyers.filter((buyer) => buyer._id !== selectedBuyerId));
      setShowModal(false);
      toast.success('Buyer deleted successfully!');
    } catch (error) {
      setError('Failed to delete buyer.');
      toast.error('Failed to delete buyer.');
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedBuyerId(id);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };



  
    // 
    const handlePrint = () => {
      const printContents = document.querySelector('.table-container');
  
      if (printContents) {
        const printWindow = window.open('', '_blank'); // Open a new window for printing
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Buyers List</title>
                <style type="text/css" media="print">
                  @page { size: landscape; } /* Set to landscape for horizontal screens */
                  body { font-family: sans-serif; }
                  table { width: 100%; border-collapse: collapse; }
                  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                  /* Add any other print-specific styles here */
                  .no-print { display: none; } /* Hide elements you don't want to print */
                </style>
              </head>
              <body>${printContents.innerHTML}</body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
          printWindow.close(); // Close the print window after printing
        } else {
          console.error("Could not open print window.");
          toast.error("Could not open print window. Please allow pop-ups."); // Inform the user about pop-up blocker
        }
  
      } else {
        console.error("No element with class 'table-container' found for printing.");
        toast.error("No data found for printing.");
      }
    };
  
    
    
    




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
    };
    //

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

    // const handleSubscribe = async (buyerId: string) => {
    //   try {
    //     // Make sure the request body includes the correct subscriptionStatus
    //     const response = await axios.put(`http://localhost:5000/api/buyers/${buyerId}`, {
    //       subscriptionStatus: 'Subscribed',
    //     });
    
    //     // If subscription is successful, update state or handle success
    //     console.log('Subscription successful:', response.data);
    //     toast.success('Buyer subscribed successfully!');
    //   } catch (error) {
    //     // Handle the error from the backend
    //     console.error('Error subscribing the buyer:', error);
    //     toast.error('Failed to subscribe the buyer.');
    //   }
    // };
    
  
    // // Unsubscribe function (sets subscriptionStatus to 'Unsubscribed')
    // const handleUnsubscribe = async (buyerId: string) => {
    //   try {
    //     await axios.put(`http://localhost:5000/api/buyers/${buyerId}`, {
    //       subscriptionStatus: 'Unsubscribed', // Set subscriptionStatus to "Unsubscribed"
    //     });
  
    //     setBuyers((prevBuyers) =>
    //       prevBuyers.map((buyer) =>
    //         buyer._id === buyerId ? { ...buyer, subscriptionStatus: 'Unsubscribed' } : buyer
    //       )
    //     );
  
    //     toast.success("Buyer unsubscribed successfully!");
    //   } catch (error) {
    //     toast.error("Failed to unsubscribe the buyer.");
    //   }
    // };
  
    
    
  

  const handleExportToExcel = () => {
    const buyersData = filteredBuyers.map((buyer) => ({
      Name: buyer.name,
      Phone: buyer.phoneNumber,
      Email: buyer.emailAddress,
      Area: buyer.areaRequired,
      'Property Type': buyer.propertyTypeSelect,
      propertyCategory: buyer.propertyCategory,
      Budget: `£${buyer.budget}`,
      deposit:`${buyer.deposit}`,
      Notes: buyer.notes,
      'Available Date': new Date(buyer.propertyAvailableDate).toLocaleDateString(),
      Address: buyer.FirstLineofAddress,
      Postcode: buyer.postcode,
      formCreatedDate:buyer.formCreatedDate,
      Status: buyer.propertyStatus,
      subscriptionStatus: buyer.subscriptionStatus
      
    }));

    const ws = XLSX.utils.json_to_sheet(buyersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Buyers');

    // Export the workbook to Excel
    XLSX.writeFile(wb, 'buyers.xlsx');
  };
 



  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setFilteredBuyers(buyers); // Show all buyers when search is empty
    } else {
      const filtered = buyers.filter((buyer) => {
        return (
          buyer.name.toLowerCase().includes(value.toLowerCase()) ||
          buyer.emailAddress.toLowerCase().includes(value.toLowerCase()) ||
          buyer.areaRequired.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredBuyers(filtered);
    }
  };

  // Handle area, property type, budget, and status filter changes
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
      filtered = filtered.filter((buyer) => {
        switch (selectedBudget) {
          case "£0-£1000":
            return buyer.budget >= 0 && buyer.budget <= 1000;
          case "£1001-£2000":
            return buyer.budget > 1000 && buyer.budget <= 2000;
          case "£2001-£3000":
            return buyer.budget > 2000 && buyer.budget <= 3000;
          case "£5001-£10,000":
            return buyer.budget > 5000 && buyer.budget <= 10000;
          case "£10,000+":
            return buyer.budget > 10000;
          default:
            return true;
        }
      });
    }
  
    setFilteredBuyers(filtered); 
    if (selectedStatus) {
      filtered = filtered.filter((buyer) => buyer.propertyStatus === selectedStatus);
    }

    setFilteredBuyers(filtered); // Update filtered buyers list
  };

  useEffect(() => {
    handleFilterChange(); // Apply filter whenever any filter value changes
  }, [searchTerm, selectedArea, selectedPropertyType,selectedPropertycategory,  selectedBudget, selectedStatus, buyers]);

  const indexOfLastBuyer = currentPage * buyersPerPage;
  const indexOfFirstBuyer = indexOfLastBuyer - buyersPerPage;
  const currentBuyers = filteredBuyers.slice(indexOfFirstBuyer, indexOfLastBuyer);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container  w-full overflow-hidden  p-4   table-container no-print">
      <h2 className="text-xl font-bold mb-4">Landlord List</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-between space-x-4 w-full">
      <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-500">
  <CgSearch className="text-gray-500 text-xl" />
  <input
    type="text"
    value={searchTerm}
    onChange={handleSearch}
    placeholder="Search by name, email, or area"
    className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
  />
</div>


  <button
  onClick={handleExportToExcel}
  className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2"
>
  <HiDownload /> {/* Add the download icon */}
  <span>Export to Excel</span>
</button>

<button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"> 
            <FaPrint />
            <span>Print</span>
          </button>



</div>


      {/* Filter Dropdowns */}
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="px-4 py-2 border rounded"
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
          className="px-4 py-2 border rounded"
        >
          <option value="">Select Property Type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedPropertycategory}
          onChange={(e) => setSelectedPropertycategory(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">Select Property Category</option>
          <option value={'Commercial'} >Commercial</option>
                <option value={'Industrial'}>Industrial</option>
                <option value={'Land'}>Land</option>
          
        </select>


        <select
  value={selectedBudget}
  onChange={(e) => setSelectedBudget(e.target.value)}
  className="px-4 py-2 border rounded"
>
  <option value="">Select Budget</option>
  {budgetRanges.map((budget) => (
    <option key={budget} value={budget}>
      {budget}
    </option>
  ))}
</select>


        {/* <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">Select Status</option>
          {propertyStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select> */}


        
      </div>

      


      {/* Table */}
      <div className="overflow-x-auto">

      
      <table className="w-full border-collapse mb-4 table-auto">
        <thead>
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className='border px-2 py-1' >Created Date</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Area</th>
            <th className="border px-2 py-1">Property Type</th>
            <th className="border px-2 py-1">Property Category</th>
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
              <td className='border px-2 py-1'>{new Date(buyer.formCreatedDate).toLocaleDateString()}</td>
              <td className="border px-2 py-1">{buyer.name}</td>
              <td className="border px-2 py-1">{buyer.phoneNumber}</td>
              <td className="border px-2 py-1">{buyer.emailAddress}</td>
              <td className="border px-2 py-1">{buyer.areaRequired}</td>
              <td className="border px-2 py-1">{buyer.propertyTypeSelect}</td>
              <td className="border px-2 py-1">{buyer.propertyCategory}</td>
              <td className="border px-2 py-1">£{buyer.budget}</td>
              <td className="border px-2 py-1">£{buyer.deposit}</td>
              <td className="border px-2 py-1">{buyer.notes}</td>
              <td className="border px-2 py-1">{new Date(buyer.propertyAvailableDate).toLocaleDateString()}</td>
              <td className="border px-2 py-1">{buyer.FirstLineofAddress}</td>
              <td className="border px-2 py-1">{buyer.postcode}</td>
              <td className="border p-2">
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
               onChange={(e)=> handleSubscribeStatus(buyer._id, e.target.value) }
               >
                <option value="Subscribed">Subscribed</option>
                <option value="UnSubscribed">UnSubscribed</option>

               </select>
              </td>


              <td className="border px-2 py-1">
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
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
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
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
