import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/Auth/authHook';

export const ProtectedRoute = ({ children }: any) => {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {        
        return <Navigate to="/login" replace />
    }

    return <Outlet />;
}