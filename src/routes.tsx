import { createBrowserRouter } from 'react-router-dom';

import Login from './paginas/Login';
import Home from './paginas/Home';
import EditarPessoa from './paginas/Pessoa/editarPessoa';
import Peso from './paginas/Peso';
import CadastroPeso from './paginas/Peso/cadastroPeso';
import EditarPeso from './paginas/Peso/editarPeso';
import Exercicio from './paginas/Exercicio';
import CadastroExecicio from './paginas/Exercicio/cadastroExecicio';
import EditarExercicio from './paginas/Exercicio/editarExercicio';
import Treino from './paginas/Treino';
import Alimento from './paginas/Alimento';
import CadastroAlimento from './paginas/Alimento/cadastroAlimento';
import EditarAlimento from './paginas/Alimento/editarAlimento';
import Dieta from './paginas/Dieta';
import CadastroDieta from './paginas/Dieta/cadastroDieta';
import EditarDieta from './paginas/Dieta/editarDieta';
import HistoricoMedico from './paginas/HistoricoMedico';
import CadastroHistoricoMedico from './paginas/HistoricoMedico/cadastroHistoricoMedico';
import EditarHistoricoMedico from './paginas/HistoricoMedico/editarHistoricoMedico';
import Logout from './paginas/Logout';
import { ProtectedRoute } from './ProtectedRoute';


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        element: <ProtectedRoute />,
        children: [            
        {
            path: '/',
            element: <Home />
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
            path: '/cadastropeso',
            element: <CadastroPeso />
        },
        {
            path: '/editarpeso/:id',
            element: <EditarPeso />
        },
        {
            path: '/exercicio/:page',
            element: <Exercicio />
        },
        {
            path: '/cadastroexercicio',
            element: <CadastroExecicio />
        },
        {
            path: '/editarexercicio/:id',
            element: <EditarExercicio />
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
            path: '/cadastroalimento',
            element: <CadastroAlimento />
        },
        {
            path: '/editaralimento/:id',
            element: <EditarAlimento />
        },
        {
            path: '/dieta/:page',
            element: <Dieta />
        },
        {
            path: '/cadastrodieta',
            element: <CadastroDieta />
        },
        {
            path: '/editardieta/:id',
            element: <EditarDieta />
        },
        {
            path: '/historicomedico/:page',
            element: <HistoricoMedico />
        },
        {
            path: '/cadastrohistoricomedico',
            element: <CadastroHistoricoMedico />
        },
        {
            path: '/editarhistoricomedico/:id',
            element: <EditarHistoricoMedico />
        },
        {
            path: '/logout',
            element: <Logout />
        }
        ]
    }
]);

export { router }