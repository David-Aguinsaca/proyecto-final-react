
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const TablaProducto = (props) => {

    return (
        <>

            <Table striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th>Identificador</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Caducidad</th>
                        <th>Observacion</th>
                        <th>Marca</th>
                        <th>Tipo de producto</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>

                    {props.dataTipoProducto.map((item) =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.precio}</td>
                            <td>{item.caducidad}</td>
                            <td>{item.observaciones}</td>
                            <td>{item.marca}</td>
                            <td>{item.tipoProducto}</td>
                            <td><Button variant="danger" id={item.id} onClick={props.eliminiarProducto}>Eliminar</Button>{' '}
                                <Button variant="info" id={item.id} onClick={props.mostrarProducto}  >Editar</Button>{' '}</td>

                        </tr>
                    )}


                </tbody>
            </Table>
        </>
    );
}

export default TablaProducto;