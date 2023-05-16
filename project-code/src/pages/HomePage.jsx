import { Container, Row, Col } from "react-bootstrap";

// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function HomePage() {
    return (
        <div className="homePage">
            <Container>
                <Row style={{marginTop: 1 + 'em'}}>
                    <Col>
                        <h1 classname="HomeHeader"> Welcome to OP-Prop<br/>
                            property management solutions</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis mauris ut velit vestibulum efficitur. Duis nec quam ipsum. Fusce cursus lacus ut elit imperdiet, ut venenatis orci sodales. 
                            
                        </p>
                    </Col>
                    <Col>
                        <img src="https://placehold.co/500"></img>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
