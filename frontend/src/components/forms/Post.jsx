import { useNavigate } from 'react-router-dom'
import Button from '../forms/Button'
import { ArrowLeft } from 'lucide-react'

const Post = () => {
    const navigate = useNavigate()

    const user = useStore((state) => state.updateUser)
    const [values, setValues] = useState({
        name: user.name,
        email: user.email,
        role: user.role,
        experience: user.experience,
        benefits: user.benefits,
        drink: user.drink,
        coefficient: user.coefficient,
        started: user.started,
        perHour: user.perHour
    })

    return (
        <div className="bg-gray-50 px-6 py-8 w-full max-h-screen h-[97.4vh] relative">
            <ArrowLeft
                size={32}
                className="absolute left-1 top-1 hover:text-gray-400 cursor-pointer"
                onClick={() => navigate('/dashboard')}
            />
            <h1 className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Create New User
            </h1>
            <div className="bg-white w-full py-4 px-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    required
                />
            </div>
            <div className="bg-white w-full py-4 px-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                />
            </div>
            <div className="bg-white w-full py-4 px-2">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="*******"
                    required
                />
            </div>
            <div className="bg-white w-full py-4 px-2">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue>Choose User role</option>
                    <option value="0">Admin</option>
                    <option value="1">Office worker</option>
                    <option value="2">Physical worker</option>
                </select>
            </div>
            <div className="bg-white w-full py-4 px-2">
                <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience</label>
                <input
                    type="number"
                    name="experience"
                    id="experience"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="5"
                />
            </div>
            <div className="bg-white w-full py-4 px-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Benefits</label>
                <div className="flex items-center mb-4">
                    <input id="answ1" type="checkbox" value="0" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="answ1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div className="flex items-center">
                    <input id="answ2" type="checkbox" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="answ2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
            </div>
            <div className="bg-white w-full py-4 px-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Drink</label>
                <div className="flex items-center mb-4">
                    <input id="answ1" type="checkbox" value="0" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="answ1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div className="flex items-center">
                    <input id="answ2" type="checkbox" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="answ2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
            </div>
            <div className="bg-white w-full py-4 px-2">
                <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coefficient</label>
                <input
                    type="number"
                    name="coefficient"
                    id="coefficient"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1.61"
                />
            </div>
            <div className="bg-white w-full py-4 px-2">
                <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Started</label>
                <input type="date" name="date-picker" id="date-picker" className="border p-2 border-gray-300 rounded-md" />
            </div>
            <div className="bg-white w-full py-4 px-2">
                <label htmlFor="perHour" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Per hour RSD</label>
                <input
                    type="number"
                    name="perHour"
                    id="perHour"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="160"
                />
            </div>
            <div className="bg-white w-full py-4 px-2">
                <Button
                    text={'Save'}
                    color={'bg-blue-600'}
                    hoverColor={'bg-blue-300'}
                    textSize={'text-sm'}
                    buttonType={'button'}
                />
            </div>
        </div>
    )
}

export default Post