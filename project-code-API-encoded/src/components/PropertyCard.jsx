import { ButtonGroup, Button, Card } from "react-bootstrap";
import { CalendarCheckFill, TrashFill } from 'react-bootstrap-icons';
import AmendPropertyModal from "./AmendPropertyModal";
// Will import from JSON as this item will be mapped
export default function PropertyCard({ id, cust_ref, address, status, asking_price, image, type, bedrooms, bathrooms, garden, garage, propObj }) {
    return (
        <Card style={{ width: '25rem', margin: '0 0 1rem 0' }}>
            <Card.Body>
                <Card.Img variant="top" style={{ height: '16rem' }} src={image} />
                <Card.Title>Property: [{id}] <br />
                    Customer: {cust_ref} </Card.Title>
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
                    <Button variant="dark"><CalendarCheckFill/></Button>
                    <Button variant="danger"><TrashFill/></Button>
                </ButtonGroup>            
    </Card.Body>
        </Card>
    );
}