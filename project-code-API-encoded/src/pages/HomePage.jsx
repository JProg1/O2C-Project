import { useEffect, useState } from "react";
import BookingItem from "../components/BookingItem";

// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function HomePage() {
    const [bookingData, setBookingData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9002/bookings', {mode: 'cors'})
            .then((response) => response.json())
            .then((data) => { setBookingData(data) })
            .catch((error) => {console.log(error)});
    }, []);

    

    return (
        <>
        <div className="homepage">

            <div className="writing">
                <h1 className="homeTitle">Welcome to OP-Prop<br />Property Solutions.</h1>
                <p>Use the links to get started. The customer link will take you to the buyer & seller detail page
                    whilst the property page will take you to property detail.</p>
                <a href="/cust" max-width="200">Customers</a>
                <a href="/prop" max-width="200">Properties</a>
            </div>

            <div>
                <img src="https://pikwizard.com/pw/medium/330cadc46347e00aca6f2f11646e8a9c.avif" width="450px" alt="KeysInDoor" />
            </div>


        </div>
        <hr />
        <h3><a href="/booking">Upcoming Bookings</a></h3>
        <div className="bookings-section" style={{width: '50%'}}>
            {bookingData.map((item) => (
                <BookingItem bookingObj={item}/>
            ))}
        </div>
        </>
    );
}
