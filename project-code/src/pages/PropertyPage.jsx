import { Container, Row, Col, Nav, Form } from "react-bootstrap";
import './PropertyStyle.css';
import { useEffect, useState } from "react";
import PropertyCard from '../components/PropertyCard';

// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function PropertyPage() {
    const [propertiesData, setPropertiesData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3004/properties')
        .then((response) => response.json())
        .then((data) => setPropertiesData(data));
    }, []);
    
    return (
        <div className="propertyPage">
            <Container>
                <h2 style={{marginTop: 0.5 + 'em'}}>Properties</h2>
                <Row style={{marginTop: 1 + 'em'}}>
                        <Row style={{marginBottom: 1 + 'em'}}>
                        <Form>
                        <Form.Control type="text" placeholder="Search" />
                        </Form>
                        </Row>
                        {propertiesData.map((item) => (
                        <Col>
                            <PropertyCard className="properyCard" id={item.id}
                                image={item.image}
                                cust_ref={item.cust_ref}
                                status={item.status}
                                asking_price={item.asking_price}
                                address={item.addr_no + ' ' + item.addr_line_1 + ", " + item.addr_town + ', ' + item.addr_postcode}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
