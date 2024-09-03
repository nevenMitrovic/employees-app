import useStore from "../../store/zustand"
import Button from "../forms/Button"

const Info = ({ id }) => {
    let employee = null
    const employees = useStore((state) => state.users)
    if (id !== null) {
        employee = employees.find(employee => id === employee._id)
    }

    if (id === null) {
        return (
            <div className="w-full flex justify-center">
                Select Employee
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col px-5 py-2">
            <h1 className="text-center font-extrabold text-3xl">Employee Info</h1>
            <div className="flex flex-col justify-center gap-2 py-5">
                <p>
                    <span className="font-bold"> Name: </span> {employee.name}
                </p>
                <p>
                    <span className="font-bold"> Email: </span> {employee.email}
                </p>
                <p>
                    <span className="font-bold"> Role: </span> {employee.role === 0 ? 'Admin' : employee.role === 1 ? 'Office worker' : 'Physical worker'}
                </p>
                <p>
                    <span className="font-bold"> Email: </span> {employee.email}
                </p>
                <p>
                    <span className="font-bold"> Experience: </span> {employee.experience === 1 ? 1 + ' year' : employee.experience + ' years'}
                </p>
                <p>
                    <span className="font-bold"> Benefits: </span> {employee.benefits ? 'Yes' : 'No'}
                </p>
                <p>
                    <span className="font-bold"> Drink: </span> {employee.drink ? 'Yes' : 'No'}
                </p>
                <p>
                    <span className="font-bold"> Coefficient: </span> {employee.coefficient}
                </p>
                <p>
                    <span className="font-bold"> Started: </span> {employee.started}
                </p>
                <p>
                    <span className="font-bold"> Per hour: </span> {employee.perHour + ' RSD'}
                </p>
            </div>
            <div className="flex gap-5">
                <Button
                    text={'Update'}
                    color={'bg-blue-600'}
                    hoverColor={'bg-blue-300'}
                    textSize={'text-sm'}
                    buttonType={'button'}
                />
                <Button
                    text={'Delete'}
                    color={'bg-red-600'}
                    hoverColor={'bg-red-300'}
                    textSize={'text-sm'}
                    buttonType={'button'}
                />
            </div>
        </div>
    )
}

export default Info