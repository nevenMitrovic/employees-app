import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": "1",
            "name": "Neven Mitrovic",
            "email": "nevenmitrovic4@gmail.com",
            "role": 1,
            "password": "blabla",
            "experience": 5,
            "benefits": false,
            "drink": false,
            "coefficient": 2.631,
            "started": "20.07.2024",
            "perHour": 360
        },
        {
            "id": "2",
            "name": "Neven Mitrovic 2",
            "email": "nevenmitrovic41@gmail.com",
            "role": 0,
            "password": "blabla",
            "experience": 5,
            "benefits": false,
            "drink": false,
            "coefficient": 2.631,
            "started": "20.07.2024",
            "perHour": 360
        },
        {
            "id": "3",
            "name": "Neven Mitrovic 3",
            "email": "nevenmitrovic42@gmail.com",
            "role": 1,
            "password": "blabla",
            "experience": 5,
            "benefits": false,
            "drink": false,
            "coefficient": 2.631,
            "started": "20.07.2024",
            "perHour": 360
        },
        {
            "id": "4",
            "name": "Neven Mitrovic 4",
            "email": "nevenmitrovic43@gmail.com",
            "role": 2,
            "password": "blabla",
            "experience": 5,
            "benefits": false,
            "drink": false,
            "coefficient": 2.631,
            "started": "20.07.2024",
            "perHour": 360
        },
        {
            "id": "5",
            "name": "Neven Mitrovic 5",
            "email": "nevenmitrovic44@gmail.com",
            "role": 2,
            "password": "blabla",
            "experience": 5,
            "benefits": false,
            "drink": false,
            "coefficient": 2.631,
            "started": "20.07.2024",
            "perHour": 360
        },
    ]

    findAll(role?: UserRole) {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User role not found')
            return rolesArray
        }
        return this.users
    }

    findOne(id: string) {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    create(createdUserDto: CreateUserDto) {
        const newUser = {
            id: 'string',
            ...createdUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: string, updatedUserDto: UpdateUserDto) {
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
