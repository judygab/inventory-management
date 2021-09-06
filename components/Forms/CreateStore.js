import React, { useState } from 'react';

const CreateStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    taxId: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const updateFormData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
  });

  const { name, taxId, phone, street, city, state, zipCode } = formData;

  return (
    <div className="flex items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
            <div className="max-w-5xl mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                <div className="text-center">
                    <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Store Details</h1>
                    <p className="text-gray-400 dark:text-gray-400">Please enter your store details</p>
                </div>
                <div className="m-7">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Legal Name of Business</label>
                            <input type="text" name="name" id="name" required value={name} onChange={e => updateFormData(e)} className="w-full px-3 py-2 text-black placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Tax ID</label>
                            <input type="text" name="taxId" id="taxId" required value={taxId} onChange={e => updateFormData(e)} className="w-full px-3 py-2 text-black placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="phone" className="text-sm text-gray-600 dark:text-gray-400">Phone Number</label>
                            <input type="text" name="phone" id="phone" required value={phone} onChange={e => updateFormData(e)} className="w-full px-3 py-2 text-black placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="street" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Street</label>
                            <input type="text" name="street" id="street" required value={street} onChange={e => updateFormData(e)} className="w-full px-3 py-2 text-black placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400" for="grid-city">
                              City
                            </label>
                            <input name="city" onChange={e => updateFormData(e)} value={city} className="appearance-none block w-full text-black border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" id="grid-city" type="text" />
                          </div>
                          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400" for="grid-state">
                              State
                            </label>
                            <div className="relative">
                              <select name="state" onChange={e => updateFormData(e)} value={state} className="block appearance-none w-full border border-gray-300 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" id="grid-state">
                                <option value="newYork">New York</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block mb-2 text-sm text-black dark:text-gray-400" for="grid-zip">
                              Zip
                            </label>
                            <input name="zipCode" id="zipCode" value={zipCode} onChange={e => updateFormData(e)} className="appearance-none block w-full text-black border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" id="grid-zip" type="text" />
                          </div>
                        </div>
                        <div className="mb-6">
                            <button type="submit" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default CreateStore;
