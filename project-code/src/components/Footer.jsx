import { Container, Row, Col } from "react-bootstrap";

// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function Footer() {
    return (

        <div className="footer">
            <footer>
            <Container>
                <Row className="footer-text">
                    <h4>Copyright © OP-Prop 2023</h4>
                </Row>
            </Container>
            </footer>
        </div>
    );
}
