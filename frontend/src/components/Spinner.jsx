import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading }) => {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#74B7FD",
    }

    return (
        <div className="flex items-center justify-center h-full">
            <ClipLoader
                color="#74B7FD"
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinner