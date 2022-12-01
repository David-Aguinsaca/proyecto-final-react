import { BrowserRouter, Routes, Route } from "react-router-dom";
import Marca from "./paginas/marca";
import TipoDeProducto from "./paginas/tipo-de-producto";
import Layout from "./componentes/layout/layout";
import Producto from "./paginas/producto";
const Router = () => {
    //const Producto = () => <h1>producto</h1>;
    //const Marca = () => <h1>marca</h1>;
    //const TipoDeProducto = () => <h1>tipoDeProducto</h1>;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="producto" element={<Producto />}></Route>
                    <Route path="tipoDeProducto" element={<TipoDeProducto />}></Route>
                    <Route path="marca" element={<Marca />}></Route>
                    **<Route path="*" element={<h1>404</h1>}></Route>**
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;