import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PencilFill } from 'react-bootstrap-icons';
export default function AmendPropertyModal(propObj) {
  propObj = propObj.propObj;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputs, setInputs] = useState({});

  const [sellerData, setSellers] = useState([]);

  const commitDate = new Date();
  let day = commitDate.getDate();
  let month = commitDate.getMonth() + 1;
  let year = commitDate.getFullYear();
  let currentDate = `${year}/${month}/${day}`;

  useEffect(() => {
    fetch('http://localhost:9002/sellers')
      .then((response) => response.json())
      .then((data) => { setSellers(data) });
  }, []);

  const handleChange = () => {

    var elements = document.getElementById("updateProperty").elements;

    for (var i = 0; i < elements.length; i++) {
      const name = elements[i].name;
      const value = elements[i].value;
      if (elements[i].type == "number") {
        setInputs(values => ({ ...values, [name]: parseInt(value) }))
      } else {
        setInputs(values => ({ ...values, [name]: value }))
      }
    }
  }

  const updateCard = (event) => {
    event.preventDefault();
    var entryID = event.target.id;
    fetch('http://127.0.0.1:9002/properties/' + entryID, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
      .then((response) => {
        // console.log(response); 
        window.location.reload(false);
      }, (error) => console.log(error));
  }

  return (
    <>

      <Button onClick={handleShow} variant="success" className="float-right"><PencilFill /></Button>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Existing Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form id="updateProperty" action="" >
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
                        controls={false}
                        autoComplete="customer_ref"
                        placeholder='customer reference'
                        defaultValue={propObj.customer_ref}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        required>
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
                        defaultValue={propObj.asking_price}
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
                        defaultValue={propObj.addr_no}
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
                        defaultValue={propObj.addr_line_1}
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
                        defaultValue={propObj.addr_town}
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
                        disabled
                        placeholder="Not in use"
                        autoComplete="address-level1"
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
                        defaultValue={propObj.addr_postcode}
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
                        defaultValue={propObj.status}
                        placeholder='property status'
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled="true" selected required></option>
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
                        defaultValue={propObj.type}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled="true" selected required></option>
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
                        defaultValue={propObj.bedrooms}
                        placeholder='bedrooms'
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled="true" selected required></option>
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
                        defaultValue={propObj.bathrooms}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled="true" selected required></option>
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
                        defaultValue={propObj.garden}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled="true" selected required></option>
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
                        defaultValue={propObj.garage}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option disabled="true" selected required></option>
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
                        defaultValue={propObj.image}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                </div>
              </div>

            </form>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={updateCard} id={propObj.id}>Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}