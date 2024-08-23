import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) {}

    async findAll(role?: UserRole) : Promise<User[]> {
        if(role) {
            const rolesArray = await this.userModel.find({ role })
            if (rolesArray.length === 0) throw new NotFoundException('Users with this role not found')
            return rolesArray
        }
        return await this.userModel.find({})
    }

    async findOne(id: string) : Promise<User> {
        try {
            if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Invalid ID format')
            const user = await this.userModel.findById(id)
            if (!user) throw new NotFoundException('User not found')
            return user
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async create(createdUserDto: CreateUserDto) : Promise<User> {
        const newUser = createdUserDto
        await this.userModel.create(newUser)
        return newUser
    }

    async update(id: string, updatedUserDto: UpdateUserDto) : Promise<User> {
        await this.userModel.findByIdAndUpdate(id, updatedUserDto)
        return await this.userModel.findById(id)
    }

    async delete(id: string) : Promise<User> {
        const deletedUser = await this.userModel.findById({ _id: id })
        await this.userModel.deleteOne({ _id: id })
        return deletedUser
    }

}
