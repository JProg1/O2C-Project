import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CalendarCheckFill } from 'react-bootstrap-icons';

function getBuyerFromID(buyerID, buyerArray) {
    var b = buyerArray.filter(x => x.id === parseInt(buyerID))[0];
    return b;
}
function getPropertyFromID(propertyID, propertyArray) {
    var property = propertyArray.filter(x => x.id === parseInt(propertyID))[0];
    return property;
}

export default function BookingAdd(props) {
    const [modalShow, setModalShow] = React.useState(false);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [inputs, setInputs] = useState({});
    const [buyerArray, setBuyerArray] = useState([]);
    const [propertyArray, setPropertyArray] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9002/buyers', { mode: 'cors' })
            .then((response) => response.json())
            .then((data) => { setBuyerArray(data); })
            .catch((error) => { console.log(error) });
    }, []);
    useEffect(() => {
        fetch('http://localhost:9002/properties', { mode: 'cors' })
            .then((response) => response.json())
            .then((data) => { setPropertyArray(data); })
            .catch((error) => { console.log(error) });
    }, []);
    const handleChange = (event) => {

        var elements = document.getElementById("newBooking").elements;

        for (var i = 0; i < elements.length; i++) {
            const name = elements[i].name;
            const value = elements[i].value;
            if (name === "customer_ref") {
                setInputs(values => ({ ...values, "buyer": getBuyerFromID(value, buyerArray) }));
            } else if (name === "property_id") {
                setInputs(values => ({ ...values, "property": getPropertyFromID(value, propertyArray) }));
            } else if (name === "time"){
                // set it as a date object so it passes correctly to MySQL / REST API
                var time = new Date(value);
                setInputs(values => ({ ...values, [name]: time }));
            } else
                if (elements[i].type == "number") {
                    setInputs(values => ({ ...values, [name]: parseInt(value) }))
                } else {
                    setInputs(values => ({ ...values, [name]: value }))
                }
        }
    }

    // Handle submit event, which pushes the data to the JSON-Server and prevents refresh of page until it's done processing.
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(inputs)
        fetch('http://127.0.0.1:9002/bookings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(inputs)
        }).then((response) => { console.log(response); window.location.reload(false); }, (error) => console.log(error));

    }
    return (
        <>
            <Button variant="dark" onClick={handleShow}><CalendarCheckFill /></Button>
            <Modal
                show={modalShow}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>Add Booking information</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-gray-500">Enter the required booking data below</h4>
                    <form id="newBooking" onSubmit={handleSubmit}>
                        <div className="border-b border-gray-900/10 pb-12">
                            <p className="mt-1 text-sm leading-6 text-gray-600"><em><strong>All fields must completed.</strong></em></p>



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
                                            {buyerArray.map((item) => (
                                                <option value={item.id}>{item.id} - {item.surname}, {item.first_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Booking Time
                                    </label>
                                    <div className="mt-2">
                                        <input type="datetime-local" id="time" name="time" required onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Property
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="property_id"
                                            name="property_id"
                                            type="number"
                                            autoComplete="property_id"
                                            placeholder=''
                                            onChange={handleChange}
                                            defaultValue={props.propObj ? props.propObj.id : 0}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option disabled="true" selected></option>
                                            {propertyArray.map((item) => (
                                                <option value={item.id}>{item.id} - {item.addr_no}, {item.addr_line_1}, {item.addr_town}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-6 sm:col-start-1">
                                    <label htmlFor="no-name-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Booking Notes
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="notes"
                                            id="notes"
                                            autoComplete="notes"
                                            placeholder=' Booking notes'
                                            onChange={handleChange}
                                            maxLength="85"
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
                        onClick={handleClose}>
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        form='newBooking' onMouseDown={handleChange}>
                        Submit
                    </button>

                </Modal.Footer>
            </Modal>
        </>

    );
}

