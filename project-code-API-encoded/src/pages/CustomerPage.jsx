import { Container, Form, Row, Tab, Tabs, Col, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import './CustStyle.css';
import BuyerAdd from "../components/AddNewBuyer";
import SellerAdd from "../components/AddNewSeller";
import CustomerItem from "../components/CustomerItem";
// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
function findPropertiesCount(sellerID, propertyArray) {
    var array = propertyArray.filter(prop => prop.customer_ref === sellerID);
    return array.length;
}
const storeSelection = (selection) => { localStorage.setItem('tabSelection', selection); console.log(localStorage.getItem('tabSelection')) };
export default function CustomerPage() {
    if(localStorage.getItem('tabSelection') == null){
        storeSelection(1);
    }
    // Array variables to store all relevant data
    const [buyerData, setBuyerData] = useState([]);
    const [sellerData, setSellerData] = useState([]);
    const [filteredBuyerData, setFilteredBuyerData] = useState([]);
    const [filteredSellerData, setFilteredSellerData] = useState([]);
    const [propertiesData, setPropertiesData] = useState([]);

    // Wildcard search functionality - compares actively the search criteria to a string built from the json data.
    const handleBuyerSearch = (event) => {
        let criteria = event.target.value.toLowerCase();
        var result = buyerData.filter(data => {
            var comparison = `${data.id} ${data.first_name} ${data.surname} ${data.phone} ${data.email} ${data.addr_no} ${data.addr_line_1} ${data.addr_postcode} ${data.addr_town} £${data.buyer_budget}`;
            return comparison.toLowerCase().includes(criteria);
        });
        setFilteredBuyerData(result);
        if (criteria.trim() === '') {
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
        if (criteria.trim() === '') {
            setFilteredSellerData(sellerData)
        }
    }

    // Fetches for the data we need for this page
    useEffect(() => {
        fetch('http://localhost:9002/buyers', {mode: 'cors'})
            .then((response) => response.json())
            .then((data) => { setBuyerData(data); setFilteredBuyerData(data) })
            .catch((error) => {console.log(error)});
    }, []);
    useEffect(() => {
        fetch('http://localhost:9002/sellers', {mode: 'cors'})
            .then((response) => response.json())
            .then((data) => { setSellerData(data); setFilteredSellerData(data); })
            .catch((error) => {console.log(error)});
    }, []);
    // Fetching property data to build a count of properties linked to each seller.
    useEffect(() => {
        fetch('http://localhost:9002/properties', {mode: 'cors'})
            .then((response) => response.json())
            .then((data) => setPropertiesData(data))
            .catch((error) => {console.log(error)});
    }, []);
    return (
        <div className="custPage">
            <Container>
                <h2 style={{ marginTop: 0.5 + 'em' }}><strong>Customers</strong></h2>
                <Row style={{ marginTop: 1 + 'em' }}>
                    <Tabs defaultActiveKey={localStorage.getItem('tabSelection')} onSelect={storeSelection} id="uncontrolled-tab-example">
                        <Tab style={{ marginTop: 1 + 'em' }} eventKey={1} title="Buyers">
                            <Row style={{ marginTop: 1 + 'em' }}>
                                {/* Search Form - onChange event used for active filtering of CustomerItem */}
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Search"
                                        aria-label="Search"
                                        onChange={(event) => handleBuyerSearch(event)}
                                    />
                                    {/* calls modal button */}
                                    <BuyerAdd />

                                </InputGroup>
                            </Row>
                            {/* Buyers list - add hovers and onClicks. */}
                            {filteredBuyerData.map((item) => (
                                <Col>
                                    {/* We map out the filteredBuyerData (which ensures search functionality) and pass data to the CustomerItem
                            We build inline strings here to display the card exactly as we want, we plan to move the building of these strings to the component itself. */}
                                    <CustomerItem className="custItem" id={item.id}
                                        name={item.title + ' ' + item.first_name + ' ' + item.surname}
                                        buyer_budget={item.buyer_budget.toLocaleString()}
                                        address={item.addr_no + ' ' + item.addr_line_1 + ", " + item.addr_town + ', ' + item.addr_postcode}
                                        phone={item.phone}
                                        email={item.email} 
                                        propObj={item}/>
                                </Col>
                            ))}
                        </Tab>
                        {/* Sellers Tab - this behaves the same was as the Buyer tab but with different strings built. */}
                        <Tab style={{ marginTop: 1 + 'em' }} eventKey={2} title="Sellers">
                            <Row style={{ marginTop: 1 + 'em' }}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Search"
                                        aria-label="Search"
                                        onChange={(event) => handleSellerSearch(event)}
                                    />
                                    <SellerAdd />
                                </InputGroup>
                            </Row>
                            {/* Selers List */}
                            {filteredSellerData.map((item) => (
                                <Col>
                                    <CustomerItem id={item.id}
                                        name={item.title + ' ' + item.first_name + ' ' + item.surname}
                                        address={item.addr_no + ' ' + item.addr_line_1 + ", " + item.addr_town + ', ' + item.addr_postcode}
                                        phone={item.phone}
                                        // We use the findPropertiesCount functon to compare how many properties have this sellers ID.
                                        properties={findPropertiesCount(item.id, propertiesData)}
                                        email={item.email}
                                        propObj={item} />
                                </Col>
                            ))}
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </div>
    );
}
