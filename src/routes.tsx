import { createBrowserRouter } from 'react-router-dom';

import Login from './paginas/Login';
import Home from './paginas/Home';
import Pessoa from './paginas/Pessoa';
import EditarPessoa from './paginas/Pessoa/editarPessoa';
import Peso from './paginas/Peso';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/pessoa',
        element: <Pessoa />
    },
    {
        path: '/editarpessoa/:id',
        element: <EditarPessoa />
    },
    {
        path: '/peso',
        element: <Peso />
    },
]);

export { router }