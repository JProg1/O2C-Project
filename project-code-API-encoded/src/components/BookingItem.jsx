import { Button, ButtonGroup, Card } from "react-bootstrap";
import DeleteModal from "./DeleteModal";

// Will import from JSON as this item will be mapped
export default function BookingItem({ bookingObj }) {
    var address = `${bookingObj.property.addr_no}, ${bookingObj.property.addr_line_1}, ${bookingObj.property.addr_town}, ${bookingObj.property.addr_postcode}`
    var date = new Date(bookingObj.time).toLocaleString("en-UK");
    return (
        <Card style={{ marginBottom: 1 + 'em', color: 'rgb(145,145,145)', textAlign: 'left' }}>
            <Card.Body>
                <Card.Title>
                    <div style={{ width: "80%" }}>
                    {date} - With {bookingObj.buyer.title} {bookingObj.buyer.first_name} {bookingObj.buyer.surname} <small><i>Tel: {bookingObj.buyer.phone}</i></small>
                    </div>
                    <div>
                        <ButtonGroup style={{ float: "right" }}>
                            <DeleteModal style={{ float: "right" }}
                                type="bookings"
                                id={bookingObj.id}
                                data={"Booking " + bookingObj.id + ", " + new Date(bookingObj.time).toLocaleString()} />
                        </ButtonGroup>
                    </div>
                </Card.Title>
                <Card.Text>
                    <div style={{ width: "80%" }}>
                        at {address} | Asking £{bookingObj.property.asking_price.toLocaleString("en-GB")}<br /><b><small>{bookingObj.notes}</small></b>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}