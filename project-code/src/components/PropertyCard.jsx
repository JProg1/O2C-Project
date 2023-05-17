import { Card } from "react-bootstrap";
// Will import from JSON as this item will be mapped
export default function PropertyCard({id, cust_ref, address, status, asking_price, image }){
    return (
        <Card style={{marginBottom: 1 + 'em'}}>
        <Card.Body>
          <Card.Img variant="top" src={image}/>
            <Card.Title>[{id}] {cust_ref}</Card.Title>
            <Card.Text>
                {address} ~ {status} ~ {asking_price}
            </Card.Text>
        </Card.Body>
        </Card>
    );
}