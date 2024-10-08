import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserRole } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users or /users?role=EXAMPLE
    findAll(@Query('role') role?: UserRole) {
        return this.usersService.findAll(role)
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id)
    }

    @Post() // POST /users
    @UseGuards(AuthGuard())
    create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @Patch(':id') // PATCH /users/:id
    @UseGuards(AuthGuard())
    update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') // DELETE /users/:id
    @UseGuards(AuthGuard())
    remove(@Param('id') id: string) {
        return this.usersService.delete(id)
    }

    @Get('/getMonthSalary/:id') // GET users/:id
    getMonthSalaryForUser(@Param('id') id: string) {
        return this.usersService.getMonthSalary(id)
    }

    @Post('/login') // POST /users/login
    login(@Body(ValidationPipe) loginDto: LoginDto) {
        return this.usersService.login(loginDto)
    }
}
