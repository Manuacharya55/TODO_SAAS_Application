import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import NavBar from "../components/shared/NavBar";

const ProtectedLayout = () => {
    const {token} = useAuth();

    if(!token){
        return <Navigate to="/login" replace/>
    }

    return (
        <div className="min-h-svh relative">
            <NavBar/>
            <div className="w-full h-full">
                <Outlet/>
            </div>
        </div>
    )
}

export default ProtectedLayout