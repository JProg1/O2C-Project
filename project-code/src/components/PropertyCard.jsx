import { Card } from "react-bootstrap";
// Will import from JSON as this item will be mapped
export default function PropertyCard({id, cust_ref, address, status, asking_price, image }){
    return (
        <Card style={{width: '22rem', margin:'0 0 1rem 0'}}>
        <Card.Body>
          <Card.Img variant="top" style={{height: '15rem'}} src={image}/>
            <Card.Title>Property: [{id}] <br/>
            Customer: {cust_ref} </Card.Title>
            <Card.Text>
                {address} <br/>
                 Currently: {status} ~ £{asking_price}.00
            </Card.Text>
        </Card.Body>
        </Card>
    );
}