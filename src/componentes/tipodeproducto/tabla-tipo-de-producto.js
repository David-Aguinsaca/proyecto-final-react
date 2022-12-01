
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const TablaTipoProducto = (props) => {

    return (
        <>

            <Table striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th>Identificador</th>
                        <th>Nombre</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>

                    {props.dataTipoProducto.map((item) =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td><Button variant="danger" id={item.id} onClick={props.eliminarTipoDeProducto}>Eliminar</Button>{' '}
                                <Button variant="info" id={item.id} onClick={props.mostrarTipoDeProducto}  >Editar</Button>{' '}</td>

                        </tr>
                    )}


                </tbody>
            </Table>
        </>
    );
}

export default TablaTipoProducto;