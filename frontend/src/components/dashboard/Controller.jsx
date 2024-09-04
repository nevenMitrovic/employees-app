import { useEffect, useState } from "react"
import UsersService from "../../services/usersService"
import Spinner from "../Spinner"
import useStore from '../../store/zustand'
import { UserRoundPlus } from "lucide-react"

const Controller = ({ handleErr, id }) => {
    const [loading, setLoading] = useState(null)
    const [employees, setEmployees] = useState(null)
    const [search, setSearch] = useState('')

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
            <div className="p-1 border-b">
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={search}
                    placeholder="Search Employee"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex gap-2 justify-end items-center hover:text-gray-400 cursor-pointer text-sm text-gray-600 py-1">
                    <UserRoundPlus
                        size={16}
                    />
                    <span>Add New Employee</span>
                </div>
            </div>
            {
                loading
                    ?
                    (<Spinner loading={loading} />)
                    :
                    (
                        <div className="text-sm font-semibold">
                            {
                                employees !== null &&
                                employees.filter((employee) => {
                                    if (search === '') {
                                        return employee
                                    } else {
                                        if ((employee.name.toLowerCase().includes(search.toLowerCase().trim()))) {
                                            return employee
                                        }
                                    }
                                })
                                    .map(employee => {
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