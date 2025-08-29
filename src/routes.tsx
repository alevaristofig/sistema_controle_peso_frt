import { createBrowserRouter } from 'react-router-dom';

import Login from './paginas/Login';
import Home from './paginas/Home';
import Pessoa from './paginas/Pessoa';

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
    }
]);

export { router }