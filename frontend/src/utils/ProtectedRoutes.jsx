import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const ProtectedRoutes = () => {
    const cookies = new Cookies(null, { path: '/' })
    const token = cookies.get('jwt_token')

    return token ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes