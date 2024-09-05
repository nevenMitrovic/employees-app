
const Post = () => {
    return ( 
        <div className="bg-gray-50 px-6 py-8 mx-auto w-full max-h-screen h-[97.4vh]">
            <h1 className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Create New User
            </h1>
            <div className="bg-white w-full py-4 px-2 rounded-md">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                />
            </div>
        </div>
    )
}

export default Post