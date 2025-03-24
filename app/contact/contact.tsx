import { useState } from "react";
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone } from "react-icons/ai";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phone: '',
  });
  const validatePhone = () => {
    const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
    // This regex matches:
    // +447123456789
    // 07123456789
    // 07123 456789
    // 07123-456-789
    // (07123) 456789
    
    if (!formData.phone) {
      setErrors({...errors, phone: 'Phone number is required'});
      return false;
    }
    
    if (!phoneRegex.test(formData.phone)) {
      setErrors({...errors, phone: 'Please enter a valid UK phone number'});
      return false;
    }
    
    setErrors({...errors, phone: ''});
    return true;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://requsest-response.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setError(result.message || "Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("There was an error submitting the form. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl border-2">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Contact Us</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <AiOutlineUser className="text-gray-500 mr-2" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full border-none outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <AiOutlineMail className="text-gray-500 mr-2" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full border-none outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="mb-4">
  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
    Phone
  </label>
  <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}>
    <AiOutlinePhone className="text-gray-500 mr-2" />
    <input
      type="tel"
      id="phone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      onBlur={validatePhone} // Add blur validation
      required
      placeholder="Enter UK phone number (e.g., 07123456789 or +447123456789)"
      className="w-full border-none outline-none focus:ring-0"
    />
  </div>
  {errors.phone && (
    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
  )}
</div>

        {/* Message Field */}
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Enter your message"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-0"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-500 transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Success/Error Messages */}
      {success && <p className="text-green-500 mt-4">{success}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ContactForm;
