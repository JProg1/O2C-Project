import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SellerAdd from './AddNewSeller';
export default function AmendModal(propObj, type, data) {
    // if(propObj != null){
        propObj = propObj.propObj;
    // }
    // console.log(propObj.propObj);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputs, setInputs] = useState({});

// Date functionality for logs when in use.
//   const commitDate = new Date();
//   let day = commitDate.getDate();
//   let month = commitDate.getMonth() + 1;
//   let year = commitDate.getFullYear();
//   let currentDate = `${year}/${month}/${day}`;

  const handleChange = () => {

    var elements = document.getElementById("updateForm").elements;

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

    handleChange();

    var entryID = event.target.id;
    fetch(`http://127.0.0.1:9002/${type.toLowerCase()}s/${entryID}`, {
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
    <Button onClick={handleShow} style={{ float: "right", marginRight: 5 + "px" }} size="sm" variant="outline-primary">Edit</Button>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Customer - {data}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form id="updateForm" action="" >
            <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-600">Use the current contact details in all instances. <br/>
          <em><strong>All fields must completed.</strong></em></p>


          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
              <label htmlFor="Title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <select
                  id="title"
                  name="title"
                  autoComplete="buyer-title"
                  placeholder='Title'
                  onChange={handleChange}
                  defaultValue={propObj.title}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled="true" selected required></option>
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Miss</option>
                  <option>Ms</option>
                  <option>Dr</option>
                  <option>Sir</option>
                  <option>Dame</option>
                  <option>Lord</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-5">
              <label htmlFor="budget" className="block text-sm font-medium leading-6 text-gray-900">
                Budget
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="buyer_budget"
                  id="budget"
                  autoComplete="buyer-budget"
                  placeholder=' 250000'
                  onChange={handleChange}
                  defaultValue={propObj.buyer_budget}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first_name"
                  id="first-name"
                  autoComplete="given-name"
                  placeholder=' Given Name'
                  onChange={handleChange}
                  defaultValue={propObj.first_name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="surname"
                  id="last-name"
                  autoComplete="family-name"
                  placeholder=' Family Name'
                  onChange={handleChange}
                  defaultValue={propObj.surname}
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
                  defaultValue={propObj.addr_no}
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
                  defaultValue={propObj.addr_line_1}
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
                  defaultValue={propObj.addr_town}
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
                  placeholder=' Not in Use'
                  onChange={handleChange}
                  disabled
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

              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Contact No
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    id="pone"
                    autoComplete="phone"
                    placeholder=' 07770000000'
                    defaultValue={propObj.phone}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>  

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder=' Anne.other@example.com'
                  defaultValue={propObj.email}
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