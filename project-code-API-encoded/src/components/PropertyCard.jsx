import { ButtonGroup, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import AmendPropertyModal from "./AmendPropertyModal";
// import PropertyDeleteModal from "./PropertyDeleteModal";
import DeleteModal from "./DeleteModal";
import BookingAdd from "./AddNewBooking";
// Will import from JSON as this item will be mapped

function findSellerName(sellerID, sellerArray) {
    var array = sellerArray.filter(prop => prop.id === sellerID);
    if(array[0] != null){
        return array[0].first_name + ' ' + array[0].surname;
    }
    return "Await seller details..";
}
export default function PropertyCard({ id, cust_ref, address, status, asking_price, image, type, bedrooms, bathrooms, garden, garage, propObj }) {
    const [sellerData, setSellerData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9002/sellers', {mode: 'cors'})
            .then((response) => response.json())
            .then((data) => { setSellerData(data); })
            .catch((error) => {console.log(error)});
    }, []);
    
    return (
        <Card style={{ width: '25rem', margin: '0 auto 1rem auto' }}>
            <Card.Body>
                <Card.Img variant="top" style={{ height: '16rem' }} src={image} />
                <Card.Title>Property: [{id}] <br />
                    Customer: {cust_ref} - {findSellerName(cust_ref, sellerData)}</Card.Title>
                <Card.Text>
                    {address} <br />
                    Currently: <strong>{status}</strong> <br />
                    £{asking_price}.00 <br />
                    Type: {type} <br />
                    Beds: {bedrooms} ~ Baths: {bathrooms} <br />
                    Garden: {garden ? "Yes" : "No"} <br />
                    Garage: {garage ? "Yes" : "No"}
                </Card.Text>
                <ButtonGroup aria-label="Basic example">
                    <AmendPropertyModal
                        propObj={propObj}/>
                    <BookingAdd propObj={propObj}/>
                    <DeleteModal 
                    type="properties"
                    id={id}
                    data={address}/>
                </ButtonGroup>            
    </Card.Body>
        </Card>
    );
}