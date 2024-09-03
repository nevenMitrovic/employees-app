
const Info = ({ id }) => {
    if (id === null) {
        return (
            <div className="w-full flex justify-center">
                Select Employee
            </div>
        )
    }

    return (
        <div className="w-full flex justify-center">
            selektovan
        </div>
  )
}

export default Info