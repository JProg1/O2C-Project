import { Container, Form, Row, Tab, Tabs, Col, InputGroup } from "react-bootstrap";
import './PropertyStyle.css';
import { useEffect, useState } from "react";
import BookingItem from '../components/BookingItem';

// to be replaced
import PropertyAdd from '../components/AddNewProperty';




export default function BookingPage() {

    const [bookingData, setBookingData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9002/bookings', {mode: 'cors'})
            .then((response) => response.json())
            .then((data) => { setBookingData(data) })
            .catch((error) => {console.log(error)});
    }, []);

    return (

        <Container>
            <Row>
                
                <h2 style={{ margin: '1rem auto 1rem auto' }}><strong>Bookings</strong></h2>
                    <InputGroup className="mb-3">
                        
                        <Form.Control
                            onChange={false}
                            placeholder="Search"
                            aria-label="Search"
                        />
                        {/* calls modal button */}
                        <PropertyAdd />
                    
                    </InputGroup>
                <Col>

                    <div className="bookings-section" style={{width: '90%', margin: '0 auto 1rem auto' }}>
                    {bookingData.map((item) => (
                        <BookingItem bookingObj={item}/>
                    ))}
                    </div>
                
                </Col>

            </Row>
    </Container>
    )
}