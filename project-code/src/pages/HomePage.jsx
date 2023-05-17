// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function HomePage() {
    return (

    <div className="homepage">
            
            <div className="writing">            
                <h1 className="homeTitle">Welcome to OP-Prop<br/>Property Management solutions.</h1>
                    <p>Use the links to get started. The customer link will take you to the buyer & seller detail page
                        whilst the property page will take you to property detail.</p>
                <a href="/cust" max-width="200">Customers</a>
                <a href="/prop" max-width="200">Properties</a>
            </div> 

        <div>
            <img src="https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" width="450px" alt="Plant" />
        </div>

</div>

    );
}
