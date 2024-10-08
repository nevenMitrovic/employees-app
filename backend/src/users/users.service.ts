import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { dateFormater } from 'src/utils/dateFormater';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) { }

    // Provera datuma pocetka ugovora zaposlenih zbog radnog staza i beneficija
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async checkDate() {
        const users = await this.findAll()
        const date = dateFormater(new Date().toLocaleString())
        for (const user of users) {
            if ((user.started.split('.')[0] + '.' + user.started.split('.')[1]) === date && user.benefits) {
                await this.userModel.findByIdAndUpdate(user._id, {
                    experience: user.experience + 1,
                    ...user
                })
            }
        }
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
        try {
            const { password, ...otherFields } = createdUserDto
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await this.userModel.create({
                ...otherFields,
                password: hashedPassword
            })
            return newUser
        } catch (error) {
            if (error.message.includes('duplicate key')) throw new BadRequestException('Email must be unique')
            throw error
        }
    }

    async update(id: string, updatedUserDto: UpdateUserDto): Promise<User> {
        try {
            if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Invalid ID format')
            const { password, ...otherFields } = updatedUserDto
            const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
            const newUserInfo = hashedPassword ? { ...otherFields, password: hashedPassword } : otherFields;
            return await this.userModel.findByIdAndUpdate(id, newUserInfo, { new: true })
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

    async getMonthSalary(id: string): Promise<number> {
        try {
            if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Invalid ID format')
            const user = await this.userModel.findById(id)
            if (!user) throw new NotFoundException('User not found')

            // Mesecna plata se obracunava na osnovu koeficijenta radnika i pomnozenog broja radnih sati u tom mesecu sa placenim radnim satom
            return user.coefficient * (160 * user.perHour)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async login(loginDto: LoginDto): Promise<{ token: string; user: User }> {
        try {
            const { email, password } = loginDto
            const user = await this.userModel.findOne({ email })
            if (!user) throw new UnauthorizedException('Invalid email or password')
            const isPasswordMatched = await bcrypt.compare(password, user.password)
            if (!isPasswordMatched) throw new UnauthorizedException('Invalid email or password')
            const token = this.jwtService.sign({ id: user._id })
            return {
                token,
                user
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

}
