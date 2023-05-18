import { Container, Row, Col } from "react-bootstrap";

// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function Footer() {
    return (

        <div className="footer">
            <footer>
            <Container  style={{float:"right"}}>
                <Row className="footer-text">
                    <h6>© Copyright OP-Prop 2023 <img style={{width:"4rem"}} src="https://www.vhv.rs/dpng/d/588-5885660_adding-trustpilot-image-next-to-logo-on-supply.png" alt="TPLogo" /></h6>
                </Row>
            </Container>
            </footer>
        </div>
    );
}
