import { Container, Row, Col } from "react-bootstrap";

// Homepage includes some react-bootstrap components to shape the page, introducing the bootstrap grid.
export default function HomePage() {
    return (
        <div className="homePage">
            <Container>
                <Row style={{marginTop: 1 + 'em'}}>
                    <Col>
                        <img src="https://placehold.co/500"></img>
                    </Col>
                    <Col>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis mauris ut velit vestibulum efficitur. Duis nec quam ipsum. Fusce cursus lacus ut elit imperdiet, ut venenatis orci sodales. Etiam et ultricies nulla. Quisque ipsum ex, blandit porta iaculis ut, fringilla at nisl. Maecenas facilisis massa nec ipsum condimentum volutpat. In hac habitasse platea dictumst. Aenean convallis, leo sit amet suscipit tristique, lectus turpis ultricies augue, eu tincidunt nisl libero nec eros. Fusce finibus porttitor arcu, non porttitor ipsum molestie ac. Morbi malesuada dui dolor. Ut id blandit arcu. Cras pharetra fermentum nunc sed venenatis. Morbi gravida elit id tincidunt tempor. Fusce malesuada ut odio sit amet dapibus. Morbi eu tempor velit, nec rhoncus neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                            Pellentesque quis imperdiet ex, id tempus purus. Fusce ultricies leo quis purus laoreet pulvinar. Fusce vitae fermentum ipsum. Nam a euismod tellus. Vestibulum finibus sollicitudin pellentesque. Curabitur id sem est. Phasellus nulla ipsum, pellentesque rutrum venenatis quis, semper vitae nulla. Duis commodo dui malesuada lorem semper, vel imperdiet lectus tincidunt. Ut urna orci, luctus eu convallis in, aliquam eget ligula.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
