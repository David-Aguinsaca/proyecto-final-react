import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TablaProducto from '../componentes/producto/tabla-producto';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import { format, parse } from 'date-fns'

const baseURL = process.env.REACT_APP_BASE_URL;

const Producto = () => {

    //editar
    const [esEditar, setEsEditar] = useState(false);

    //modal crear
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //mostrar
    const [data, setData] = useState([]);
    const [dataMarca, setDataMarca] = useState([]);
    const [dataTipoProducto, setDataTipoProducto] = useState([]);
    const [error, setError] = useState(null);

    //datos formulario
    let inputFormulario = {
        nombre: "",
        precio: 0,
        observaciones: "",
        //caducidad: new Date(),
        caducidad: format(new Date(), 'yyyy-MM-dd'),
        marcaId: '',
        tipoProductoId: ''
    }
    const [formValue, setFormValue] = useState(inputFormulario);

    const handleChange = (event) => {
        setFormValue({ ...formValue, [event.target.name]: event.target.value });
    }

    //eliminar
    const eliminiarProducto = (event) => {

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

                axios.delete(baseURL + 'Producto?marcaId=' + id)
                    .then(response => {
                        const result = data.filter(data => data.id !== parseInt(id));
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

    //mostrar especifica
    const mostrarProducto = (event) => {
        setEsEditar(true);
        let id = event.target.getAttribute("id");
        axios
            .get(baseURL + 'Producto/' + id)
            .then((response) => {
                console.log(response.data);

                let inputFormulario = {
                    id: response.data.id,
                    nombre: response.data.nombre,
                    precio: response.data.precio,
                    observaciones: response.data.observaciones,
                    //caducidad: new Date(),
                    caducidad: response.data.caducidad.substring(0, 10),
                    marcaId: response.data.marcaId,
                    tipoProductoId: response.data.tipoProductoId
                }

                setFormValue(inputFormulario);

            })
            .catch((error) => setError(error));
        handleShow();
    }


    useEffect(() => {
        axios
            .get(baseURL + 'Producto')
            .then((response) => {
                //console.log(response.data.lista);
                setData(response.data.lista);
            })
            .catch((error) => setError(error));

        axios
            .get(baseURL + 'TipoProducto')
            .then((response) => {
                //console.log(response.data);
                setDataTipoProducto(response.data);
            })
            .catch((error) => setError(error));

        axios
            .get(baseURL + 'Marca')
            .then((response) => {
                //console.log(response.data);
                setDataMarca(response.data);
            })
            .catch((error) => setError(error));
    }, []);


    const abrirModal = () => {
        setFormValue(inputFormulario);
        setEsEditar(false);
        handleShow();
    }

    const createOrUpdate = (event) => {

        event.preventDefault();

        if (!esEditar) {
            //crear

            console.log(formValue.marcaId);

            axios.post(baseURL + 'Producto', formValue)
                .then((response) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El producto se a creado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(response.data);
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

            //https://localhost:7127/Producto?id=4

            axios.put(baseURL + 'Producto?id=' + formValue.id, formValue).then((response) => {

                data.map(function (dato) {
                    if (dato.id === parseInt(formValue.id)) {
                        dato.nombre = formValue.nombre;
                        dato.precio = formValue.precio;
                        dato.caducidad = formValue.caducidad;
                        dato.observaciones = formValue.observaciones;
                        dato.marcaId = formValue.marcaId;
                        dato.tipoProductoId = formValue.tipoProductoId;
                    }

                    return dato;
                });

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El tipo de producto se a actualizado correctamente',
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
            });
        }

    }

    return (<>
        <Container >
            <Row className='p-3'>
                <Col sm={8}>
                    <h3>Lista de Productos</h3>
                </Col>
                <Col sm={4}>
                    <Button variant="primary" onClick={abrirModal}>
                        Crear nueva producto
                    </Button>
                </Col>
            </Row>
            <Row className='p-3'>
                {
                    data.length > 0 ?
                        error ? <span>Error</span> : <TablaProducto dataTipoProducto={data}
                            eliminiarProducto={eliminiarProducto}
                            mostrarProducto={mostrarProducto}></TablaProducto> : <span>No hay productos</span>}

            </Row>
        </Container>

        <Modal show={show} onHide={handleClose} className="me-2" onSubmit={createOrUpdate}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Llenar el formulario</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Container>

                        <Row>
                            <Col xs={6} md={4}>

                                <Form.Group className="mb-3" controlId="formMarca">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        required
                                        className="nombre"
                                        name="nombre"
                                        value={formValue.nombre}
                                        onChange={handleChange}
                                        placeholder="Tipo de producto" />
                                </Form.Group>

                            </Col>
                            <Col xs={6} md={4}>

                                <Form.Group className="mb-3" controlId="formMarca">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number"
                                        step=".01"
                                        min="0"
                                        required
                                        className="precio"
                                        name="precio"
                                        value={formValue.precio}
                                        onChange={handleChange}
                                        placeholder="Tipo de producto" />
                                </Form.Group>

                            </Col>
                            <Col xs={6} md={4}>

                                <Form.Group className="mb-3" controlId="formMarca">
                                    <Form.Label>Caducidad</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        className='caducidad'
                                        name="caducidad"
                                        placeholder="DateRange"
                                        value={formValue.caducidad}
                                        onChange={handleChange}
                                    //onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={4}>

                                <Form.Group className="mb-3" controlId="formTipoProducto">
                                    <Form.Label>Tipo de Producto</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={formValue.tipoProductoId}
                                        onChange={handleChange}
                                        name="tipoProductoId"
                                        className='tipoProductoId'
                                        required
                                    >
                                        <option>Open this select menu</option>
                                        {
                                            dataTipoProducto.map((item) =>
                                                <option key={item.id} value={item.id}>{item.nombre}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>

                            </Col>
                            <Col xs={6} md={4}>

                                <Form.Group className="mb-3" controlId="formMarca">
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={formValue.marcaId}
                                        onChange={handleChange}
                                        name="marcaId"
                                        className='marcaId'
                                        required
                                    >
                                        <option>Open this select menu</option>
                                        {
                                            dataMarca.map((item) =>
                                                <option key={item.id} value={item.id} >{item.nombre}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>

                            </Col>
                            <Col xs={6} md={4}>



                                <Form.Group className="mb-3" controlId="formMarca">
                                    <Form.Label>Observacion</Form.Label>
                                    <Form.Control
                                        required
                                        className='observaciones'
                                        name='observaciones'
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        onChange={handleChange}
                                        value={formValue.observaciones}
                                        style={{ height: '100px' }}
                                    />
                                </Form.Group>

                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" type="submit" /* onClick={createOrUpdate} */>
                        {esEditar ? 'Editar' : 'Crear'}
                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>
    </>

    );
}

export default Producto;