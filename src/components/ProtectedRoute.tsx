import { Navigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
import { useAuthStore } from "@/stores/useAuthStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { session, loading } = useAuthStore();

    if (loading) {
        // Simple loading state
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
