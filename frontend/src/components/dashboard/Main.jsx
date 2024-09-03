import { useState } from "react"
import Controller from "./Controller"
import ServerError from "../ServerError"
import Info from "./Info"

const Main = () => {
    const [error, setError] = useState(false)
    const [id, setId] = useState(null)

    const handleError = (err) => {
        setError(err)
    }
    const setUserId = (id) => {
        setId(id)
    }

    if (error) {
        return (
            <>
                <ServerError />
            </>
        )
    }

    return (
        <div className="flex max-h-screen">
            <Controller
                handleErr={handleError}
                id={setUserId}
            />
            <Info id={id} />
        </div>
    )
}

export default Main