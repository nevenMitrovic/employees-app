import { useAxios } from "../hooks/useAxios";

class UsersService {
    httpClient = useAxios()

    async findAll() {
        try {
            const response = await this.httpClient.get('/users')
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async login(data) {
        try {
            const response = await this.httpClient.post('/users/login', data)
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async delete(id, token) {
        try {
            const response = await this.httpClient.delete('/users/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async update(id, token, data) {
        try {
            const response = await this.httpClient.patch(`/users/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

export default new UsersService()