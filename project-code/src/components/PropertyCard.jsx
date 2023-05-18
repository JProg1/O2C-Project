import { Card } from "react-bootstrap";
// Will import from JSON as this item will be mapped
export default function PropertyCard({id, cust_ref, address, status, asking_price, image }){
    return (
        <Card style={{marginBottom: 1 + 'em'}}>
        <Card.Body>
          <Card.Img variant="top" src={image}/>
            <Card.Title>Property: [{id}] <br/>
            Customer: {cust_ref}</Card.Title>
            <Card.Text>
                {address} <br/>
                 Currently: {status} ~ £{asking_price}.00
            </Card.Text>
        </Card.Body>
        </Card>
    );
}