import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": "1",
            "name": "Neven Mitrovic",
            "email": "nevenmitrovic4@gmail.com",
            "role": "OFFICE_WORKER"
        },
        {
            "id": "2",
            "name": "Neven Mitrovic 2",
            "email": "nevenmitrovic41@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": "3",
            "name": "Neven Mitrovic 3",
            "email": "nevenmitrovic42@gmail.com",
            "role": "OFFICE_WORKER"
        },
        {
            "id": "4",
            "name": "Neven Mitrovic 4",
            "email": "nevenmitrovic43@gmail.com",
            "role": "PHYSICAL_WORKER"
        },
        {
            "id": "5",
            "name": "Neven Mitrovic 5",
            "email": "nevenmitrovic44@gmail.com",
            "role": "PHYSICAL_WORKER"
        },
    ]

    findAll(role?: 'OFFICE_WORKER' | 'PHYSICAL_WORKER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User role not found')
            return rolesArray
        }
        return this.users
    }

    findOne(id: string) {
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User not found')
        return user
    }

    create(createdUserDto: { name: string, email: string, role: string }) {
        const newUser = {
            id: 'random',
            ...createdUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: string, updatedUserDto: { name?: string, email?: string, role?: string }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUserDto }
            }
        })

        return this.findOne(id)
    }

    delete(id: string) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }

}
