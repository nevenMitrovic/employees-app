import axios from 'axios'
import { useState } from 'react'

const useAxios = () => {
    const [response, setResponse] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/'
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    axiosInstance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    const fetchData = async ({ method, url, data = {}, params = {} }) => {
        setLoading(true)

        try {
            const result = await axiosInstance({
                method,
                url,
                data,
                params
            })
            setResponse(result.data)
        } catch (error) {
            setError(error)
            console.error(error.response ? error.response.data : error.message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        response,
        error,
        loading,
        fetchData
    }
}

export default useAxios