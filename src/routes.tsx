import { createBrowserRouter } from 'react-router-dom';

import Login from './paginas/Login';
import Home from './paginas/Home';
import Pessoa from './paginas/Pessoa';
import EditarPessoa from './paginas/Pessoa/editarPessoa';
import Peso from './paginas/Peso';
import Exercicio from './paginas/Exercicio';
import Treino from './paginas/Treino';
import Alimento from './paginas/Alimento';
import Dieta from './paginas/Dieta';
import HistoricoMedico from './paginas/HistoricoMedico';

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
        path: '/peso/:page',
        element: <Peso />
    },
    {
        path: '/exercicio/:page',
        element: <Exercicio />
    },
    {
        path: '/treino/:page',
        element: <Treino />
    },
    {
        path: '/alimento/:page',
        element: <Alimento />
    },
    {
        path: '/dieta/:page',
        element: <Dieta />
    },
    {
        path: '/historicomedico/:page',
        element: <HistoricoMedico />
    }
]);

export { router }