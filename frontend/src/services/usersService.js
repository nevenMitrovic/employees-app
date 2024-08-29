import { useAxios } from "../hooks/useAxios";

class UsersService {
    httpClient = useAxios()

    async findAll(url) {
        try {
            const response = await this.httpClient.get(url)
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

export default new UsersService()