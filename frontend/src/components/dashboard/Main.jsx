import { useState } from "react"
import Controller from "./Controller"
import ServerError from "../ServerError"

const Main = () => {
    const [error, setError] = useState(false)

    const handleError = (err) => {
        setError(err)
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
            <Controller handleErr={handleError} />
            <div className="w-full">
                asdasd
            </div>
        </div>
    )
}

export default Main