import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'universal-cookie'
import UsersService from '../../services/usersService'
import useStore from '../../store/zustand'
import Button from '../forms/Button'
import { ArrowLeft } from 'lucide-react'
import dateFormater from '../../utils/dateFormater'

const Post = () => {
    const navigate = useNavigate()

    const user = useStore((state) => state.updateUser)
    const removeUpdateUser = useStore((state) => state.removeUpdateUser)

    const [error, setError] = useState(null)

    const today = new Date().toISOString().split('T')[0]

    const cookies = new Cookies(null, { path: '/' })
    const formik = useFormik({
        initialValues: {
            name: user ? user.name : "",
            email: user ? user.email : "",
            password: user ? user.password : "",
            role: user ? user.role : "",
            experience: user ? user.experience : "",
            benefits: user ? user.benefits : false,
            drink: user ? user.drink : false,
            coefficient: user ? user.coefficient : "",
            started: user ? user.started : dateFormater(today).DMY,
            perHour: user ? user.perHour : ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters long')
                .required('Required'),
            email: Yup.string()
                .email('Please enter correct email')
                .required('Required'),
            role: Yup.number()
                .required('Required'),
            experience: Yup.number()
                .required('Required'),
            benefits: Yup.boolean(),
            drink: Yup.boolean(),
            coefficient: Yup.number()
                .required('Required'),
            started: Yup.string()
                .required('Required'),
            perHour: Yup.number()
                .required('Required'),
        }),
        onSubmit: (values) => {
            if (user) {
                UsersService.update(user._id, cookies.get('jwt_token'), values)
                    .then((res) => {
                        navigate('/dashboard')
                        removeUpdateUser()
                    })
                    .catch((error) => {
                        setError(error.response.data.message)
                    })
            } else {
                UsersService.create(cookies.get('jwt_token'), values)
                    .then((res) => {
                        navigate('/dashboard')
                        removeUpdateUser()
                    })
                    .catch((error) => {
                        setError(error.response.data.message)
                    })
            }
        }
    })

    return (
        <div className="bg-gray-50 px-6 py-8 w-full max-h-screen h-[97.4vh] relative">
            <ArrowLeft
                size={32}
                className="absolute left-1 top-1 hover:text-gray-400 cursor-pointer"
                onClick={() => { navigate('/dashboard'); removeUpdateUser() }}
            />
            <h1 className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                {user ?
                    'Update User' : 'Create New User'
                }
            </h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="bg-white w-full py-4 px-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John Doe"
                        required
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        autoComplete='email'
                        required
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="*******"
                        autoComplete='current-password'
                        required
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                    <select
                        onChange={(e) => formik.setFieldValue('role', parseInt(e.target.value))}
                        id="role"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value={null}>Choose User role</option>
                        <option value={0}>Admin</option>
                        <option value={1}>Office worker</option>
                        <option value={2}>Physical worker</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                        <div className="text-red-500 text-sm">{formik.errors.role}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience</label>
                    <input
                        type="number"
                        name="experience"
                        id="experience"
                        value={formik.values.experience}
                        onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="5"
                    />
                    {formik.touched.experience && formik.errors.experience ? (
                        <div className="text-red-500 text-sm">{formik.errors.experience}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Benefits</label>
                    <div className="flex items-center mb-1">
                        <input id="answ1" type="checkbox" checked={formik.values.benefits} onChange={(e) => formik.setFieldValue('benefits', e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="answ1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                    </div>
                    {formik.touched.benefits && formik.errors.benefits ? (
                        <div className="text-red-500 text-sm">{formik.errors.benefits}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Drink</label>
                    <div className="flex items-center mb-1">
                        <input id="answ2" type="checkbox" checked={formik.values.drink} onChange={(e) => formik.setFieldValue('drink', e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="answ2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                    </div>
                    {formik.touched.drink && formik.errors.drink ? (
                        <div className="text-red-500 text-sm">{formik.errors.drink}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coefficient</label>
                    <input
                        type="number"
                        name="coefficient"
                        id="coefficient"
                        value={formik.values.coefficient}
                        onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1.61"
                    />
                    {formik.touched.coefficient && formik.errors.coefficient ? (
                        <div className="text-red-500 text-sm">{formik.errors.coefficient}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <label htmlFor="started" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Started</label>
                    <input
                        type="date"
                        name="started"
                        id="started"
                        min={!user ? today : ''}
                        onChange={(e) => formik.setFieldValue('started', dateFormater(e.target.value ? e.target.value : today).DMY)}
                    />
                    {formik.touched.started && formik.errors.started ? (
                        <div className="text-red-500 text-sm">{formik.errors.started}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <label htmlFor="perHour" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Per hour RSD</label>
                    <input
                        type="number"
                        name="perHour"
                        id="perHour"
                        value={formik.values.perHour}
                        onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="160"
                    />
                    {formik.touched.perHour && formik.errors.perHour ? (
                        <div className="text-red-500 text-sm">{formik.errors.perHour}</div>
                    ) : null}
                    {
                        error !== null &&
                        <div className="text-red-500 text-sm">{error}</div>
                    }
                </div>
                <div className="bg-white w-full py-4 px-2">
                    <Button
                        text={'Save'}
                        color={'bg-blue-600'}
                        hoverColor={'bg-blue-300'}
                        textSize={'text-sm'}
                        buttonType={'submit'}
                    />
                </div>
            </form>
        </div>
    )
}

export default Post