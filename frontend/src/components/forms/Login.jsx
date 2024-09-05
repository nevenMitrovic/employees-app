import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.jpg'
import { useState } from 'react'
import {
  Eye,
  EyeOff
} from 'lucide-react'
import { useFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import UsersService from '../../services/usersService'
import Cookies from 'universal-cookie'
import useStore from '../../store/zustand'

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const setUser = useStore((state) => state.setUser)
  const cookies = new Cookies(null, { path: '/' })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Required'),
      email: Yup.string()
        .email('Please enter correct email')
        .required('Required'),
    }),
    onSubmit: (values) => {
      UsersService.login(values)
        .then((res) => {
          cookies.set('jwt_token', res.token)
          setUser(res.user)
          if (res.user) navigate('/dashboard')
        })
        .catch((error) => {
          setError(error.response.data.message)
        })
    }
  })

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Employee App
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  autoComplete="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
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
              <div>
                <div className="flex justify-between items-center mb-2 gap-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  {
                    passwordVisibility ?
                      (
                        <EyeOff
                          size={16}
                          className="hover:text-gray-400 cursor-pointer"
                          onClick={() => setPasswordVisibility(!passwordVisibility)}
                        />
                      ) : (
                        <Eye
                          size={16}
                          className="hover:text-gray-400 cursor-pointer"
                          onClick={() => setPasswordVisibility(!passwordVisibility)}
                        />
                      )
                  }
                </div>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  autoComplete="current-password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.password}
                  onChange={formik.handleChange}
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
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login