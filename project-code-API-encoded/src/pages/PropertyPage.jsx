import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import './PropertyStyle.css';
import { useEffect, useState } from "react";
import PropertyCard from '../components/PropertyCard';
import PropertyAdd from "../components/AddNewProperty";

// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function PropertyPage() {
    const [propertiesData, setPropertiesData] = useState([]);
    const [sellerData, setSellerData] = useState([]);
    const [filteredPropertiesData, setFilteredPropertiesData] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:9002/properties')
            .then((response) => response.json())
            .then((data) => { setPropertiesData(data); setFilteredPropertiesData(data) });
    }, []);
    useEffect(() => {
        fetch('http://127.0.0.1:9002/sellers')
            .then((response) => response.json())
            .then((data) => { setSellerData(data); });
    }, []);
    const handleSearch = (event) => {
        
        let criteria = event.target.value.toLowerCase();
        var result = filteredPropertiesData.filter(data => {
            var array = sellerData.filter(prop => prop.id === data.cust_ref);
            var sellerName = "";
            if(array[0] != null){
                sellerName = `${array[0].first_name} ${array[0].surname}`;
            }
            var comparison = `${data.id} ${data.asking_price} ${data.cust_ref} ${sellerName} ${data.addr_no} ${data.addr_line_1} ${data.addr_postcode} ${data.addr_town} £${data.type} ${data.status}`;
            return comparison.toLowerCase().includes(criteria);
        });
        setFilteredPropertiesData(result);
        if (criteria.trim() === '') {
            setFilteredPropertiesData(propertiesData)
        }
    }

    return (
        <div className="propertyPage">
            <Container>
                <h2 style={{ marginTop: 0.5 + 'em' }}><strong>Properties</strong></h2>
                <Row style={{ marginTop: 1 + 'em' }}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={handleSearch}
                            placeholder="Search"
                            aria-label="Search"
                        />
                        {/* calls modal button */}
                        <PropertyAdd />

                    </InputGroup>
                    {filteredPropertiesData.map((item) => (
                        <Col>
                            <PropertyCard className="properyCard" id={item.id}
                                propObj={item}
                                image={item.image}
                                cust_ref={item.customer_ref}
                                status={item.status}
                                asking_price={item.asking_price.toLocaleString("en-GB")}
                                address={item.addr_no + ', ' + item.addr_line_1 + ", " + item.addr_town + ', ' + item.addr_postcode}
                                type={item.type}
                                bedrooms={item.bedrooms}
                                bathrooms={item.bathrooms}
                                garden={item.garden}
                                garage={item.garage}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
