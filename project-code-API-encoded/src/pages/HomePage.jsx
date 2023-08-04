// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function HomePage() {
    return (

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

    );
}
