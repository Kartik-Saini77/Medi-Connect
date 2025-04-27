import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const hasToken = document.cookie.includes('token=');
    
    if (!hasToken) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;