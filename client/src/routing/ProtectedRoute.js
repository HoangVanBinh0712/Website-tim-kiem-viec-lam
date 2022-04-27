import { useContext } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import NavbarMenu from "../layouts/NavBarMenu"

const ProtectedRoute = ({component : Component})=>{
    const {authState :{isAuthenticated,authLoading}} = useContext(AuthContext)
    if(authLoading){
        return(
            <div className="spinner-container">
                <Spinner animation="border" variant='info'/>

            </div>
        )
    }
    return isAuthenticated ?<><NavbarMenu> </NavbarMenu> <Component/></> : <Navigate to={'/login'}/>
}

export default ProtectedRoute