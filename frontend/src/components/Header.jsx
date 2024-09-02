import useStore from '@/store/zustand'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const user = useStore((state) => state.user)
    const removeUser = useStore((state) => state.removeUser)
    const cookies = new Cookies(null, { path: '/' })
    const navigate = useNavigate()

    const logout = () => {
        cookies.remove('jwt_token')
        removeUser()
        navigate('/login')
    }

    return (
        <div className="bg-blue-500 h-6 flex justify-end items-center px-5 text-sm font-bold">
            <div className="border-r border-black px-2">
                {user.name}
            </div>
            <div
                className="flex items-center px-2 cursor-pointer hover:text-white"
                onClick={logout}
            >
                Logout
            </div>
        </div>
    )
}

export default Header