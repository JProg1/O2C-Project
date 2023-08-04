import { Button, ButtonGroup, Card } from "react-bootstrap";

// Will import from JSON as this item will be mapped
export default function BookingItem({ bookingObj }) {
    var address = `${bookingObj.property.addr_no} ${bookingObj.property.addr_line_1} ${bookingObj.property.addr_line_2}`
    return (
        <Card style={{ marginBottom: 1 + 'em', color: 'rgb(145,145,145)', textAlign: 'left' }}>
            <Card.Body>
                <Card.Title>
                    <div style={{ width: "80%" }}>
                        ID: {bookingObj.id} - With <i>{bookingObj.buyer.title} {bookingObj.buyer.first_name} {bookingObj.buyer.surname}</i>
                    </div>
                    <div>
                        {/* <ButtonGroup style={{ float: "right" }}>
                            <AmendCustomerModal propObj={propObj} sendType={seller ? "Seller" : "Buyer"} id={id}/>
                            <DeleteModal style={{ float: "right" }}
                                type={seller ? "sellers" : "buyers"}
                                id={id}
                                data={name} />
                        </ButtonGroup> */}
                    </div>
                </Card.Title>
                <Card.Text>
                    <div style={{ width: "80%" }}>
                        at {address}, 
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}