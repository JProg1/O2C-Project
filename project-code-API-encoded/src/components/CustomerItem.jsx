import { Button, Card } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import AmendCustomerModal from "./AmendCustomerModal";

// Will import from JSON as this item will be mapped
export default function CustomerItem({ id, name, address, phone, email, buyer_budget, properties, propObj }) {
    var properties_display = "";
    var seller = false;
    if (buyer_budget == null) {
        buyer_budget = "";
        seller = true;
    } else {
        buyer_budget = "~ Budget: £" + buyer_budget.toLocaleString("en-GB");
    }
    if (properties != null) {
        properties_display = "~ Properties: " + properties;
    }

    return (
        <Card style={{ marginBottom: 1 + 'em', color: 'rgb(145,145,145)', textAlign: 'left' }}>
            <Card.Body>
                <Card.Title>
                    <div style={{ width: "80%" }}>
                        [{id}] {name} {buyer_budget} {properties_display}
                    </div>
                    <div>
                    <DeleteModal style={{ float: "right" }}
                        type={seller ? "sellers" : "buyers"} 
                        id={id} 
                        data={name}/>                    
                        {/* <Button style={{ float: "right" }} size="sm" variant="outline-danger">Delete</Button> */}
                        {seller ? <AmendSellerModal propObj={propObj}/> : <AmendBuyerModal propObj={propObj} />}
                    </div>
                </Card.Title>
                <Card.Text>
                    <div style={{ width: "80%" }}>
                        {address} ~ {phone} ~ {email}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}