import { Card } from "react-bootstrap";
// Will import from JSON as this item will be mapped
export default function CustomerItem({id, name, address, phone, email, buyer_budget}){

    
    return (
        <Card style={{marginBottom: 1 + 'em',color:'rgb(145,145,145)', textAlign:'left'}}>
        <Card.Body>
            <Card.Title>[{id}] {name} ~ Budget: {buyer_budget} </Card.Title>
            <Card.Text>
                {address} ~ {phone} ~ {email}
            </Card.Text>
        </Card.Body>
        </Card>
    );
}