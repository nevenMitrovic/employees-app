import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users
    findAll(@Query('role') role?: 'OFFICE_WORKER' | 'PHYSICAL_WORKER') {
        return this.usersService.findAll(role)
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id)
    }

    @Post() // POST /users
    create(@Body() userCreateDto: { name: string, email: string, role: string }) {
        return this.usersService.create(userCreateDto)
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdateDto: { name?: string, email?: string, role?: string }) {
        return this.usersService.update(id, userUpdateDto)
    }

    @Delete(':id') // DELETE /users/:id
    remove(@Param('id') id: string) {
        return this.usersService.delete(id)
    }

}
