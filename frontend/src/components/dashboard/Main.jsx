import { useState } from "react"
import Controller from "./Controller"
import ServerError from "../ServerError"
import Info from "./Info"

const Main = () => {
    const [error, setError] = useState(false)
    const [id, setId] = useState(null)
    const [update, setUpdate] = useState(false)

    const handleError = (err) => {
        setError(err)
    }
    const setUserId = (id) => {
        setId(id)
    }
    const setUpdateSignal = () => {
        setUpdate(!update)
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
                update={update}
            />
            <Info
                id={id}
                setId={setUserId}
                update={setUpdateSignal}
            />
        </div>
    )
}

export default Main