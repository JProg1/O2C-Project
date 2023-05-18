import { Container, Form, Row, Tab, Tabs, Col, InputGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import './CustStyle.css';

import CustomerItem from "../components/CustomerItem";
// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function CustomerPage() {
    const [buyerData, setBuyerData] = useState([]);
    const [sellerData, setSellerData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3004/buyers')
        .then((response) => response.json())
        .then((data) => setBuyerData(data));
    }, []);
    useEffect(() => {
        fetch('http://localhost:3004/sellers')
        .then((response) => response.json())
        .then((data) => setSellerData(data));
    }, []);
    return (
        <div className="custPage">
            <Container>
                <h2 style={{marginTop: 0.5 + 'em'}}>Customers</h2>
                <Row style={{marginTop: 1 + 'em'}}>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab style={{marginTop: 1 + 'em'}} eventKey={1} title="Buyers">
                    <Row style={{marginTop: 1 + 'em'}}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                                Search
                            </Button>
                            <Button variant="outline-primary" id="button-addon2">
                                Add New
                            </Button>
                        </InputGroup>
                    </Row>
                    {/* Buyers list - add hovers and onClicks. */}
                    {buyerData.map((item) => (
                        <Col>
                            <CustomerItem className="custItem" id={item.id}
                                name={item.title + ' ' + item.first_name + ' ' + item.surname}
                                buyer_budget={item.buyer_budget.toLocaleString()}
                                address={item.addr_no + ' ' + item.addr_line_1 + ", " + item.addr_town + ', ' + item.addr_postcode}
                                phone={item.phone}
                                email={item.email}/>
                        </Col>
                    ))}
                </Tab>
                <Tab style={{marginTop: 1 + 'em'}} eventKey={2} title="Sellers">
                    <Row style={{marginTop: 1 + 'em'}}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                                Search
                            </Button>
                            <Button variant="outline-primary" id="button-addon2">
                                Add New
                            </Button>
                        </InputGroup>
                    </Row>
                    {/* Selers List */}
                    {sellerData.map((item) => (
                        <Col>
                            <CustomerItem id={item.id}
                                name={item.title + ' ' + item.first_name + ' ' + item.surname}
                                address={item.addr_no + ' ' + item.addr_line_1 + ", " + item.addr_town + ', ' + item.addr_postcode}
                                phone={item.phone}
                                properties={item.seller_prop_links}
                                email={item.email}/>
                        </Col>
                    ))}
                </Tab>
                </Tabs>
                </Row>
            </Container>
        </div>
    );
}
