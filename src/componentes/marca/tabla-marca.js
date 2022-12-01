
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const TablaMarca = (props) => {

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

                    {props.dataMarca.map((item) =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td><Button variant="danger" id={item.id} onClick={props.eliminarMarca}>Eliminar</Button>{' '}
                                <Button variant="info" id={item.id} onClick={props.mostrarMarca}  >Editar</Button>{' '}</td>

                        </tr>
                    )}


                </tbody>
            </Table>
        </>
    );
}

export default TablaMarca;