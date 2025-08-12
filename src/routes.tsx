import { createBrowserRouter } from 'react-router-dom';

import Home from './paginas/Home';

const router = createBrowserRouter([
    {
        path: '/home',
        element: <Home />
    }
]);

export { router }