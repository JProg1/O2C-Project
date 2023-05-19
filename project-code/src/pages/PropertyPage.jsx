import { Container, Row, Col, Form } from "react-bootstrap";
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
        <div className="propertyPage" style={{width: "70%"}}>
            <Container>
                <h2 style={{marginTop: 0.5 + 'em'}}><strong>Properties</strong></h2>
                <Row style={{marginTop: 1 + 'em'}}>
                        <Row style={{marginBottom:"1rem"}}>
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
                                asking_price={item.asking_price.toLocaleString("en-GB")}
                                address={item.addr_no + ' ' + item.addr_line_1 + ", " + item.addr_town + ', ' + item.addr_postcode}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
