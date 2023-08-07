import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./InputStyles.css";

function PropertyModal(props) {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.type == "number") {
      setInputs(values => ({ ...values, [name]: parseInt(value) }))
    } else {
      setInputs(values => ({ ...values, [name]: value }))
    }
  }
  const [sellerData, setSellerData] = useState([]);

  useEffect(() => {
      fetch('http://localhost:9002/sellers', {mode: 'cors'})
          .then((response) => response.json())
          .then((data) => { setSellerData(data); })
          .catch((error) => {console.log(error)});
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:9002/properties', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
      .then((response) => { console.log(response); window.location.reload(false); }, (error) => console.log(error));

  }
  // handleSubmit(null)
  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>Add Property Information</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-gray-500">Enter the required propety data below</h4>
        <form id="updateProperty" onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-12">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              <em><strong>All fields must completed.</strong></em></p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="Cust-Ref" className="block text-sm font-medium leading-6 text-gray-900">
                  Customer ref
                </label>
                <div className="mt-2">
                <select
                    id="customer_ref"
                    name="customer_ref"
                    type="number"
                    autoComplete="customer_ref"
                    placeholder='customer reference'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled="true" selected></option>
                    {sellerData.map((item) => (
                      <option value={item.id}>{item.id} - {item.surname}, {item.first_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-5">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Asking Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="asking_price"
                    id="price"
                    autoComplete="price"
                    placeholder=' Property Value'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="no-name-address" className="block text-sm font-medium leading-6 text-gray-900">
                  House Number or Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="addr_no"
                    id="no-name-address"
                    autoComplete="no-name-address"
                    placeholder=' Number/Name'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-4">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Address Line
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="addr_line_1"
                    id="street-address"
                    autoComplete="street-address"
                    placeholder=' 1 Street Avenue'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  Town or City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="addr_town"
                    id="city"
                    autoComplete="address-level2"
                    placeholder=' SomeTon'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  County
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="addr_postcode"
                    id="region"
                    autoComplete="address-level1"
                    placeholder=' SomeTonShire'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  Postcode
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="addr_postcode"
                    id="postal-code"
                    autoComplete="postal-code"
                    placeholder=' AB12 3CD'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="Status" className="block text-sm font-medium leading-6 text-gray-900">
                  Property Status
                </label>
                <div className="mt-2">
                  <select
                    id="status"
                    name="status"
                    autoComplete="status"
                    placeholder='property status'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled="true" selected></option>
                    <option>FOR SALE</option>
                    <option>WITHDRAWN</option>
                    <option>SOLD</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-5">
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                  Property Type
                </label>
                <div className="mt-2">
                  <select
                    id="type"
                    name="type"
                    autoComplete="type"
                    placeholder='property type'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled="true" selected></option>
                    <option>Detached</option>
                    <option>Semi</option>
                    <option>Bungalow</option>
                    <option>Terrace</option>
                    <option>Studio</option>
                    <option>Flat</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1 sm:col-start-2">
                <label htmlFor="bedrooms" className="block text-sm font-medium leading-6 text-gray-900">
                  No of Beds
                </label>
                <div className="mt-2">
                  <select
                    id="beds"
                    name="bedrooms"
                    autoComplete="bedrooms"
                    placeholder='bedrooms'
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled="true"></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="bathrooms" className="block text-sm font-medium leading-6 text-gray-900">
                  Bathrooms
                </label>
                <div className="mt-2">
                  <select
                    id="bathrooms"
                    name="bathrooms"
                    autoComplete="bathrooms"
                    placeholder='bathrooms'
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled="true" selected></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="garden" className="block text-sm font-medium leading-6 text-gray-900">
                  Garden
                </label>
                <div className="mt-2">
                  <select
                    id="garden"
                    name="garden"
                    autoComplete="garden"
                    placeholder='garden'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled="true" selected></option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>

                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="garage" className="block text-sm font-medium leading-6 text-gray-900">
                  Garage
                </label>
                <div className="mt-2">
                  <select
                    id="garage"
                    name="garage"
                    autoComplete="garage"
                    placeholder='garage'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled="true" selected></option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>

                  </select>
                </div>
              </div>

              <div className="col-span-7">
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                  Image location - filepath or URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="image"
                    id="image"
                    autoComplete="image"
                    placeholder=' Insert filepath or URL'
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>

        <button
          type="button"
          className="rounded-md bg-slate-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={props.onHide}>
          Cancel
        </button>


        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          form='updateProperty'>
          Submit
        </button>

      </Modal.Footer>
    </Modal>
  );
}

export default function PropertyAdd() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
    
      <Button variant="outline-primary" id="button-addon2" onClick={() => setModalShow(true)}>
        Add New
      </Button>


      <PropertyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
