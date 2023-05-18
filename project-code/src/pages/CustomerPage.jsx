import { Container, Form, Row, Tab, Tabs, Col, InputGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import './CustStyle.css';

import CustomerItem from "../components/CustomerItem";
// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
function findPropertiesCount(sellerID, propertyArray){
    var array = propertyArray.filter(prop => prop.cust_ref === sellerID);
    return array.length;
}

export default function CustomerPage() {
    const [buyerData, setBuyerData] = useState([]);
    const [sellerData, setSellerData] = useState([]);
    const [filteredBuyerData, setFilteredBuyerData] = useState([]);
    const [filteredSellerData, setFilteredSellerData] = useState([]);
    const [propertiesData, setPropertiesData] = useState([]);
    const handleBuyerSearch = (event) => {
        let criteria = event.target.value.toLowerCase();
        var result = buyerData.filter(data => {
            var comparison = `${data.id} ${data.first_name} ${data.surname} ${data.phone} ${data.email} ${data.addr_no} ${data.addr_line_1} ${data.addr_postcode} ${data.addr_town}`;
            return comparison.toLowerCase().includes(criteria);
        });
        setFilteredBuyerData(result);
        if(criteria.trim() === ''){
            setFilteredBuyerData(buyerData)
        }
    }
    const handleSellerSearch = (event) => {
        let criteria = event.target.value.toLowerCase();
        var result = sellerData.filter(data => {
            var comparison = `${data.id} ${data.first_name} ${data.surname} ${data.phone} ${data.email} ${data.addr_no} ${data.addr_line_1} ${data.addr_postcode} ${data.addr_town}`;
            return comparison.toLowerCase().includes(criteria);
        });
        setFilteredSellerData(result);
        if(criteria.trim() === ''){
            setFilteredSellerData(sellerData)
        }
    }
    useEffect(() => {
        fetch('http://localhost:3004/buyers')
        .then((response) => response.json())
        .then((data) => {setBuyerData(data); setFilteredBuyerData(data)});
    }, []);
    useEffect(() => {
        fetch('http://localhost:3004/sellers')
        .then((response) => response.json())
        .then((data) => {setSellerData(data); setFilteredSellerData(data)});
    }, []);
    useEffect(() => {
        fetch('http://localhost:3004/properties')
        .then((response) => response.json())
        .then((data) => setPropertiesData(data));
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
                                onChange={(event) => handleBuyerSearch(event)}
                            />
                            <Button variant="outline-primary" id="button-addon2">
                                Add New
                            </Button>
                        </InputGroup>
                    </Row>
                    {/* Buyers list - add hovers and onClicks. */}
                    {filteredBuyerData.map((item) => (
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
                                onChange={(event) => handleSellerSearch(event)}
                            />
                            <Button variant="outline-primary" id="button-addon2">
                                Add New
                            </Button>
                        </InputGroup>
                    </Row>
                    {/* Selers List */}
                    {filteredSellerData.map((item) => (
                        <Col>
                            <CustomerItem id={item.id}
                                name={item.title + ' ' + item.first_name + ' ' + item.surname}
                                address={item.addr_no + ' ' + item.addr_line_1 + ", " + item.addr_town + ', ' + item.addr_postcode}
                                phone={item.phone}
                                properties={findPropertiesCount(item.id, propertiesData)}
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
