import { Container, Row } from "react-bootstrap";

// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function Footer() {
    return (

        <div className="footer">
            <footer>
                <Container style={{ float: "right" }}>
                    <Row className="footer-text">
                        <h6>© Copyright OP-Prop 2023</h6>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}
