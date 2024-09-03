import { useEffect, useState } from "react"
import UsersService from "../../services/usersService"
import Spinner from "../Spinner"
import useStore from '../../store/zustand'

const Controller = ({ handleErr, id }) => {
    const [loading, setLoading] = useState(null)
    const [employees, setEmployees] = useState(null)

    const setUsers = useStore((state) => state.setUsers)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await UsersService.findAll()
                setEmployees(res)
                setUsers(res)
            } catch (error) {
                handleErr(error)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])



    return (
        <div className="w-1/3 h-[97.4vh] bg-orange-300 border-r">
            {
                loading
                    ?
                    (<Spinner loading={loading} />)
                    :
                    (
                        <div className="text-sm font-semibold">
                            {
                                employees !== null &&
                                employees.map(employee => {
                                    return (
                                        <p
                                            key={employee._id}
                                            className="border-b flex items-center justify-center cursor-pointer hover:text-white"
                                            onClick={() => id(employee._id)}
                                        >
                                            {employee.name}
                                        </p>
                                    )
                                })
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default Controller