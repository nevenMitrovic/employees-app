import { useEffect, useState } from "react"
import UsersService from "../../services/usersService"
import Spinner from "../Spinner"

const Controller = ({ handleErr }) => {
    const [loading, setLoading] = useState(null)
    const [employees, setEmployees] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await UsersService.findAll()
                setEmployees(res)
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
                                        <p key={employee._id} className="border-b flex items-center justify-center cursor-pointer hover:text-white">
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