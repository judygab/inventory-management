import React, { useState } from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/core';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validEmailRegex =
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  const updateFormData = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    switch (name) {
      case 'name':
        errors.name = value.length < 1 ? 'Please enter your name' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is invalid';
        break;
      case 'message':
        errors.message = value.length < 1 ? 'Please enter your message' : '';
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [event.target.name]: event.target.value
    });
  }

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) =>
      val.length > 0 && (valid = false)
    );
    return valid;
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (validateForm(errors)) {
      setDisplayErrorMessage(true);
    } else {
      // TODO: submit the form
      setDisplayErrorMessage(false);
    }
  }

  return (
    <div className="flex items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
            <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                <div className="text-center">
                    <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Contact Us</h1>
                    {
                      success &&
                      <Alert
                        status="success"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        height="200px"
                      >
                        <AlertIcon boxSize="40px" mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize="lg" color="gray.700">
                          Thank you for reaching out!
                        </AlertTitle>
                        <AlertDescription maxWidth="sm" color="gray.700">
                          Our team will get back to you as soon as possible.
                        </AlertDescription>
                      </Alert>
                    }
                    { displayErrorMessage &&
                      <Alert status="error">
                        <AlertIcon />
                         {
                           Object.values(errors).map((message) => message.length > 0 && <p>{message}</p>)
                         }
                      </Alert>
                    }
                    <p className="text-gray-400 dark:text-gray-400">Fill up the form below to send us a message.</p>
                </div>
                <div className="m-7">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Full Name</label>
                            <input type="text" name="name" id="name" placeholder="John Doe" onChange={e => updateFormData(e)} required className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                            <input type="email" name="email" id="email" placeholder="you@company.com" onChange={e => updateFormData(e)} required className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">

                            <label htmlFor="phone" className="text-sm text-gray-600 dark:text-gray-400">Phone Number</label>
                            <input type="text" name="phone" id="phone" placeholder="+1 (555) 1234-567" onChange={e => updateFormData(e)} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Your Message</label>

                            <textarea rows="5" name="message" id="message" placeholder="Your Message" onChange={e => updateFormData(e)} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" required></textarea>
                        </div>
                        <div className="mb-6">
                            <button type="submit" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Send Message</button>
                        </div>
                        <p className="text-base text-center text-gray-400" id="result">
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default ContactUs;
