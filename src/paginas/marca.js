import React, { useState, useEffect } from 'react';
import TablaMarca from '../componentes/marca/tabla-marca';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import Swal from 'sweetalert2'
//import withReactContent from 'sweetalert2-react-content'
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
//const MySwal = withReactContent(Swal)

const Marca = () => {

    //editar
    const [esEditar, setEsEditar] = useState(false);

    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //mostrar todo
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(baseURL + 'Marca')
            .then((response) => {
                //console.log(response.data);
                setData(response.data);
            })
            .catch((error) => setError(error));
    }, []);


    //crear
    const [formValue, setFormValue] = useState({
        id: "",
        nombre: "",
    });

    const handleChange = (event) => {
        setFormValue({ ...formValue, [event.target.name]: event.target.value });
    }

    const abrirModal = () => {
        setFormValue({ id: "", nombre: "" });
        setEsEditar(false);
        handleShow();
    }

    //eliminar
    const eliminarMarca = (event) => {

        Swal.fire({
            title: 'Estas seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar !'
        }).then((result) => {
            if (result.isConfirmed) {
                let id = event.target.getAttribute("id");

                axios.delete(baseURL + 'Marca?marcaId=' + id)
                    .then(response => {
                        const result = data.filter(data => data.id !== id);
                        console.log(result);
                        setData(result);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    //mostrar
    const mostrarMarca = (event) => {
        setEsEditar(true);
        let id = event.target.getAttribute("id");
        axios
            .get(baseURL + 'Marca/' + id)
            .then((response) => {
                console.log(response.data);
                //setData(response.data);
                setFormValue(response.data);

            })
            .catch((error) => setError(error));
        handleShow();
    }

    const createOrUpdate = (event) => {

        event.preventDefault();
        console.log('validacion');

        if (!esEditar) {
            //crear
            axios.post(baseURL + 'Marca', formValue)
                .then((response) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'La marca se a creado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setData([...data, response.data]);
                    handleClose();
                }).catch((error) => {
                    console.log(error.response.data.title);
                    let message = error.response.data.title;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: message,
                    })
                });

        } else {
            //editar

            axios.put(baseURL + 'Marca?id=' + formValue.id, {
                nombre: formValue.nombre
            }).then((response) => {

                data.map(function (dato) {
                    if (dato.id === formValue.id) {
                        dato.nombre = formValue.nombre;
                    }

                    return dato;
                });

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'La marca se a actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                setData(data);
                handleClose();

                console.log(data)

            }).catch((error) => {
                console.log(error.response.data.detail);
                let message = error.response.data.detail.toString();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                })

                //setError(error);
            });
        }

    }


    return (
        <>
            <Container >
                <Row className='p-3'>
                    <Col sm={8}>
                        <h3>Lista de marcas</h3>
                    </Col>
                    <Col sm={4}>
                        <Button variant="primary" onClick={abrirModal}>
                            Crear nueva marca
                        </Button>
                    </Col>
                </Row>
                <Row className='p-3'>
                    {error ? <span>Error</span> : <TablaMarca dataMarca={data}
                        eliminarMarca={eliminarMarca}
                        mostrarMarca={mostrarMarca}></TablaMarca>}

                </Row>
            </Container>

            <Modal show={show} onHide={handleClose} onSubmit={createOrUpdate}>
                <Form >
                    <Modal.Header closeButton>
                        <Modal.Title>Llenar el formulario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formIdentificador">
                            <Form.Label>Identificador</Form.Label>
                            <Form.Control type="text"
                                /* disabled */
                                required
                                className="id"
                                name="id"
                                value={formValue.id}
                                onChange={handleChange}
                                placeholder="Identificador" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMarca">
                            <Form.Label>Nombre de la Marca</Form.Label>
                            <Form.Control type="text"
                                required
                                className="nombre"
                                name="nombre"
                                value={formValue.nombre}
                                onChange={handleChange}
                                placeholder="Marca" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {/* <Button variant="primary" onClick={crearMarca}>
                        Crear
                    </Button> */}
                        <Button variant="primary" type="submit">
                            {esEditar ? 'Editar' : 'Crear'}
                        </Button>
                    </Modal.Footer>

                </Form>

            </Modal>

        </>
    );
}

export default Marca;