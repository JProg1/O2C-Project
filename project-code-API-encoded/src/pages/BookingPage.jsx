import { Container, Form, Row, Col, InputGroup } from "react-bootstrap";
import './PropertyStyle.css';
import { useEffect, useState } from "react";
import BookingItem from '../components/BookingItem';
import BookingAdd from "../components/AddNewBooking";




export default function BookingPage() {

    const [bookingData, setBookingData] = useState([]);
    const [filteredBookingData, setFilteredBookingData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9002/bookings', {mode: 'cors'})
            .then((response) => response.json())
            .then((data) => { setBookingData(data); setFilteredBookingData(data) })
            .catch((error) => {console.log(error)});
    }, []);

    // Wildcard search functionality - compares actively the search criteria to a string built from the json data.
    const handleSearch = (event) => {
        let criteria = event.target.value.toLowerCase();
        var result = bookingData.filter(data => {
            var comparison = `${data.id} ${data.notes} ${data.buyer.titles} ${data.buyer.first_name} ${data.buyer.surname} ${data.buyer.phone} ${data.buyer.email} ${data.property.addr_no} ${data.property.addr_line_1} ${data.property.addr_postcode} ${data.property.addr_town} ${new Date(data.time).toLocaleString()}`;
            return comparison.toLowerCase().includes(criteria);
        });
        setFilteredBookingData(result);
        if (criteria.trim() === '') {
            setFilteredBookingData(bookingData)
        }
    }

    return (

        <Container>
            <Row>
                
                <h2 style={{ margin: '1rem auto 1rem auto' }}><strong>Bookings</strong></h2>
                    <InputGroup className="mb-3">
                        
                        <Form.Control
                            onChange={handleSearch}
                            placeholder="Search"
                            aria-label="Search"
                        />
                        {/* calls modal button */}
                        <BookingAdd />
                    
                    </InputGroup>
                <Col>

                    <div className="bookings-section" style={{width: '90%', margin: '0 auto 1rem auto' }}>
                    {filteredBookingData.map((item) => (
                        <BookingItem bookingObj={item}/>
                    ))}
                    </div>
                
                </Col>

            </Row>
    </Container>
    )
}