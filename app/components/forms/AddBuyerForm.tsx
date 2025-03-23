"use client"
import { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

interface FormData {
  name: string;
  phoneNumber: string;
  emailAddress: string;
  propertyTypeSelect: string;
  propertyCategory: string
  areaRequired: string;
  FirstLineofAddress: string;
  postcode: string;
  budget: Number;
  deposit: Number;
  notes: string;
  propertyAvailableDate: string;
}

const BuyerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    emailAddress: '',
    propertyTypeSelect: '',
    propertyCategory: '',
    areaRequired: '',
    FirstLineofAddress: '',
    postcode: '',
    budget: 0,
    deposit:0,
    notes: '',
    propertyAvailableDate: '',
  });
  // const [Captcha, setCaptcha] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');


  const propertyTypes = ["Cafe", "Car Wash", "Factory","Healthcare","Hotel","Medical Center","Nursing Homes","Office","Pub","Restaurant","Retail","Shops","Shopping Center","Sports Facilities",'Unit',"Warehouse","Other"]; // Property types based on schema
  const ukCities = [
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
    // Add more cities as needed
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
    });
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!Captcha) {
    //   setErrorMessage("Please complete the CAPTCHA to proceed.");
    //   setLoading(false);
    //   return;
    // }

   
    

    
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('https://requsest-response.vercel.app/api/buyers', formData);
      setLoading(false);
      setSuccessMessage('Thank you for providing your information. Once we find a suitable tenant for your property, our representative will get in touch with you.');
      setFormData({
        name: '',
        phoneNumber: '',
        emailAddress: '',
        propertyTypeSelect: '',
        propertyCategory: '',
        areaRequired: '',
        FirstLineofAddress: '',
        postcode: '',
        budget: 0,
        deposit: 0,
        notes: '',
        propertyAvailableDate: '',
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to submit buyer data.');
      console.error('Error submitting buyer data:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6   border-2 rounded-lg shadow-2xl mt-8">
    <h1 className="text-2xl font-bold mb-4 text-center">
  Landlord Online Form
  <span className=""></span>
</h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Full Name*
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
    Phone Number*
  </label>
  <div className="mt-1 flex rounded-md shadow-sm">
    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
      +44
    </span>
    <input
      type="tel"
      name="phoneNumber"
      id="phoneNumber"
      placeholder="XXXXXXXXXX"
      value={formData.phoneNumber.replace(/^\+44/, '')}
      onChange={(e) => {
        const inputValue = e.target.value.replace(/^\+44/, ''); // Remove any +44 if pasted
        const cleanedValue = inputValue.replace(/\D/g, '').slice(0, 10); // Limit to 10 digits
        const isValid = cleanedValue.length === 10;
        
        setFormData({ 
          ...formData, 
          phoneNumber: `+44${cleanedValue}` 
        });
        
        // Set validation error
        setPhoneError(isValid ? '' : 'Phone number must be 10 digits');
      }}
      onBlur={() => {
        if (formData.phoneNumber.replace(/^\+44/, '').length !== 10) {
          setPhoneError('Phone number must be 10 digits');
        }
      }}
      required
      className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border ${
        phoneError ? 'border-red-500' : ''
      }`}
    />
  </div>
  {phoneError && (
    <p className="mt-2 text-sm text-red-600">{phoneError}</p>
  )}
</div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="emailAddress">
            Email Address*
          </label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

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



        {/* property types */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="propertyTypeSelect">
            Property Type*
          </label>
          <select
            name="propertyTypeSelect"
            id="propertyTypeSelect"
            value={formData.propertyTypeSelect}
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
            
            {/*  */}
           
        

        <div className='mb-4'>
          <label className="block text-sm font-medium text-gray-700" htmlFor="FirstLineofAddress">
            First Line of Address*
          </label>
          <input
            name="FirstLineofAddress"
            id="FirstLineofAddress"
            value={formData.FirstLineofAddress}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
            />
        </div>

       
        {/* Area Required (Dropdown for UK Cities) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="areaRequired">
            City*
          </label>
          <select
            name="areaRequired"
            id="areaRequired"
            value={formData.areaRequired}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select a City</option>
            {ukCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {/* FirstLineofAddress */}
       
        {/* Postcode */}
        <div className='mb-4'>
          <label className="block text-sm font-medium text-gray-700" htmlFor="postcode">
            Postcode*
          </label>
          <input
            name="postcode"
            id="postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>


        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="deposit">
          Deposit*
          </label>
          <input
            name="deposit"
            id="deposit"
            value={Number(formData.deposit) || ""}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
           
          
        </div>
      

        {/* Budget */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="budget">
            Rent*
          </label>
          <input
            name="budget"
            id="budget"
            value={Number(formData.budget) || ""}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
           
          
        </div>
           {/* deposit */}
           

        

        {/* Property Available Date */}
        <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700" htmlFor="propertyAvailableDate">
    Property Available Date*
  </label>
  <input
    type="date"
    name="propertyAvailableDate"
    id="propertyAvailableDate"
    value={formData.propertyAvailableDate}
    onChange={handleChange}
    min={new Date().toISOString().split("T")[0]} // Restricts past dates
    required
    className="mt-1 p-2 border rounded-md w-full"
  />
</div>
               {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="notes">
            Notes(optional)
          </label>
          <textarea
            name="notes"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
{/* 
        <div className="mb-4 ">

<ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_SITE as string} onChange={setCaptcha}  className="mx-auto"/>
</div> */}


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
       {/* Success and Error Messages */}
       {successMessage && <p className="text-green-500 font-serif text-lg  mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

    </div>
  );
};

export default BuyerForm;
