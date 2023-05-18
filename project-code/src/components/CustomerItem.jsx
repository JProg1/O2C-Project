import { Button, Card } from "react-bootstrap";
// Will import from JSON as this item will be mapped
export default function CustomerItem({id, name, address, phone, email, buyer_budget, properties}){
    var properties_display = "";
    var isSeller = false;
    if(buyer_budget == null){
        buyer_budget = "";
    }else{
        buyer_budget = "~ Budget: £" + buyer_budget.toLocaleString("en-GB");
    }
    if(properties != null){
        isSeller = true;
        properties_display = "~ Properties: " + properties.length;
    }
    
    return (
        <Card style={{marginBottom: 1 + 'em',color:'rgb(145,145,145)', textAlign:'left'}}>
        <Card.Body>
            <Card.Title>[{id}] {name} {buyer_budget} {properties_display}
            {isSeller ? null : <Button style={{float: "right"}} size="sm" variant="outline-danger">Delete</Button>}
            {isSeller ? <Button style={{float: "right"}} size="sm" variant="outline-primary">View</Button> : <Button style={{float: "right", marginRight: 5 + "px"}} size="sm" variant="outline-primary">Edit</Button>}
            </Card.Title>
            <Card.Text>
                {address} ~ {phone} ~ {email}
            </Card.Text>
        </Card.Body>
        </Card>
    );
}