import { Card } from "react-bootstrap";
// Will import from JSON as this item will be mapped
export default function CustomerItem({id, name, address, phone, email}){
    return (
        <Card style={{marginBottom: 1 + 'em'}}>
        <Card.Body>
            <Card.Title>[{id}] {name}</Card.Title>
            <Card.Text>
                {address} ~ {phone} ~ {email}
            </Card.Text>
        </Card.Body>
        </Card>
    );
}