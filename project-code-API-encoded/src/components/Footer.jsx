import { Container, Row } from "react-bootstrap";

// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function Footer() {
    return (

        <div className="footer">
            <footer>
                <Container style={{ float: "right" }}>
                    <Row className="footer-text">
                        <p>© Copyright OP-Prop 2023</p>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}
