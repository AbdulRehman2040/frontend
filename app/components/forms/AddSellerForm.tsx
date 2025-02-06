"use client"
import { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";


export default function SellerForm() {
  const [formData, setFormData] = useState({
    landlordName: "",
    landlordPhoneNumber: "",
    landlordEmailAddress: "",
    landlordPropertyType: "",
    propertyCategory:'',
    landlordPropertyAddress: "",
    Size: "",
    landlordRent: "",
    notes: "",
  });
  // const [Captcha, setCaptcha] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 const budget = [
  "£0-£1000",
  "£1001-£2000",
  "£2001-£3000",
  "£5001-£10,000",
  "£10,000+",
];

 const size = [ "0-1000 sq. ft.",
  "1000-2000 sq. ft.",
  "2000-3000 sq. ft.",
  "5000-10000 sq. ft.",
  "10000-20000 sq. ft.",
  "20000 sq. ft. +",]
  const AreaRequired =  [
    "Aireborough",
    "Baildon",
    "Bingley",
    "Bradford",
    "Brighouse",
    "Castleford",
    "Colne Valley",
    "Denby Dale",
    "Denholme",
    "Dewsbury",
    "Elland",
    "Featherstone",
    "Halifax",
    "Hebden Royd",
    "Heckmondwike",
    "Hemsworth",
    "Holmfirth",
    "Huddersfield",
    "Ilkley",
    "Keighley",
    "Knottingley",
    "Leeds",
    "Meltham",
    "Mirfield",
    "Morley",
    "Normanton",
    "Ossett",
    "Otley",
    "Pontefract",
    "Pudsey",
    "Queensbury and Shelf",
    "Ripponden",
    "Rothwell",
    "Shipley",
    "Silsden",
    "Skipton",
    "Spenborough",
    "Stanley",
    "Tadcaster",
    "Todmorden",
    "Wakefield",
    "Wetherby",
    "Wharfedale","Other",
  ];

  const propertyTypes = ["Cafe", "Car Wash", "Factory","Healthcare","Hotel","Medical Center","Nursing Homes","Office","Pub","Restaurant","Retail","Shops","Shopping Center","Sports Facilities","Warehouse",'Unit',"Other"]; // Property types based on schema

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
  
    // Check if CAPTCHA is completed
    // if (!Captcha) {
    //   setErrorMessage("Please complete the CAPTCHA to proceed.");
    //   setLoading(false);
    //   return;
    // }

    // https://requsest-response.vercel.app/api/sellers
  
    try {
      const response = await axios.post(
        "https://requsest-response.vercel.app/api/sellers",
        { ...formData,  }
      );
      setLoading(false);
      setSuccessMessage("Thank you for providing your information. As soon as we find a suitable property, our representative will contact you");
      setFormData({
        landlordName: "",
        landlordPhoneNumber: "",
        landlordEmailAddress: "",
        landlordPropertyType: "",
        propertyCategory: "",
        landlordPropertyAddress: "",
        Size: "",
        landlordRent: "",
        notes: "",
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to submit seller data.");
      console.error("Error submitting seller data:", error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 rounded-lg shadow-2xl mt-">
      <h1 className="text-2xl font-bold mb-4 text-center">Tenant Online Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Landlord Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordName">
          Full Name*
          </label>
          <input
            type="text"
            name="landlordName"
            id="landlordName"
            value={formData.landlordName}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Landlord Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordPhoneNumber">
            Phone Number*
          </label>
          <input
            type="text"
            name="landlordPhoneNumber"
            placeholder="+44XXXXXXXXX"
            id="landlordPhoneNumber"
            value={formData.landlordPhoneNumber}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Landlord Email Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordEmailAddress">
            Email Address*
          </label>
          <input
            type="email"
            name="landlordEmailAddress"
            id="landlordEmailAddress"
            value={formData.landlordEmailAddress}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

       
           
           {/*  */}
           <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700' htmlFor="propertyCategory">
                Property Category*</label>
               <select
               name='propertyCategory'
               id='propertyCategory'
               value={formData.propertyCategory}
               onChange={handleChange}
               required
               className="mt-1 p-2 border rounded-md w-full">
                <option value=''>Select Property Category</option>
                <option value={'Commercial'} >Commercial</option>
                <option value={'Industrial'}>Industrial</option>
                <option value={'Land'}>Land</option>
               </select>
            </div>

             {/* Property Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordPropertyType">
            Property Type*
          </label>
          <select
            name="landlordPropertyType"
            id="landlordPropertyType"
            value={formData.landlordPropertyType}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select Property Type</option>
            {propertyTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
            
        {/* Property Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordPropertyAddress">
            Area Required*
          </label>
          <select
            name="landlordPropertyAddress"
            id="landlordPropertyAddress"
            value={formData.landlordPropertyAddress}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
            >
          <option value="">Select Area</option>
          {AreaRequired.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
          </select>
        </div>

        {/* SIZE */}
        <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700" htmlFor="Size">
    Size Required*
  </label>
  <select
    name="Size" // Matches the state key
    id="size"
    value={formData.Size}
    onChange={handleChange}
    required
    className="mt-1 p-2 border rounded-md w-full"
  >
    <option value="">Select Size</option>
    {size.map((size, index) => (
      <option key={index} value={size}>
        {size}
      </option>
    ))}
  </select>
</div>

        {/* Rent */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordRent">
            My Budget*
          </label>
          <select
            name="landlordRent"
            id="landlordRent"
            value={formData.landlordRent}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
            >
          <option value="">Select Budget</option>
          {budget.map((size, index) => (
      <option key={index} value={size}>
        {size}
      </option>
    ))}
            </select>
        </div>

       
        
        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="notes">
            Notes (optional)
          </label>
          <textarea
            name="notes"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* GOOGLE RECH */}
        {/* <div className="mb-4 ">

        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_SITE as string} onChange={setCaptcha}  className="mx-auto"/>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Submitting" : "Submit"}
        </button>
      </form>

      {/* Success and Error Messages */}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}
 