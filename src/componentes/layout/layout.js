import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';

const Layout = () => {
    return (
        <>
            <Card className="m-3">
                <Card.Header>
                    <Navbar bg="primary" variant="dark">
                        <Container>
                            <Navbar.Brand href="producto">Inicio</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="producto">Producto</Nav.Link>
                                <Nav.Link href="tipoDeProducto">Tipo de producto</Nav.Link>
                                <Nav.Link href="marca">Marca</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </Card.Header>
                <Card.Body>
                <Outlet></Outlet>

                </Card.Body>
            </Card>

        </>
    );
};
export default Layout;