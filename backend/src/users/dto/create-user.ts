import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export enum UserRole {
    ADMIN = 0,
    OFFICE_WORKER = 1,
    PHYSICAL_WORKER = 2
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, {message: 'Please enter correct email'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsNumber()
    experience: number;

    @IsBoolean()
    benefits: boolean;

    @IsBoolean()
    drink: boolean;

    @IsNumber()
    coefficient: number;

    @IsString()
    started: string;

    @IsNumber()
    perHour: number;

}
