import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { dateFormater } from 'src/utils/dateFormater';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) { }

    // Provera datuma pocetka ugovora zaposlenih zbog radnog staza i beneficija
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async checkDate() {
        const users = await this.findAll()
        const date = dateFormater(new Date().toLocaleString())
        
    }

    async findAll(role?: UserRole): Promise<User[]> {
        if (role) {
            const rolesArray = await this.userModel.find({ role })
            if (rolesArray.length === 0) throw new NotFoundException('Users with this role not found')
            return rolesArray
        }
        return await this.userModel.find({})
    }

    async findOne(id: string): Promise<User> {
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

    async create(createdUserDto: CreateUserDto): Promise<User> {
        const newUser = createdUserDto
        await this.userModel.create(newUser)
        return newUser
    }

    async update(id: string, updatedUserDto: UpdateUserDto): Promise<User> {
        try {
            if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Invalid ID format')
            await this.userModel.findByIdAndUpdate(id, updatedUserDto)
            return await this.userModel.findById(id)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async delete(id: string): Promise<User> {
        try {
            if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Invalid ID format')
            const deletedUser = await this.userModel.findById({ _id: id })
            await this.userModel.deleteOne({ _id: id })
            return deletedUser
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getMonthSalary (id: string): Promise<number> {
        try {
            if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Invalid ID format')
            const user = await this.userModel.findById(id)
            if(!user) throw new NotFoundException('User not found')

            // Mesecna plata se obracunava na osnovu koeficijenta radnika i pomnozenog broja radnih sati u tom mesecu sa placenim radnim satom
            return user.coefficient * (160 * user.perHour)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

}
