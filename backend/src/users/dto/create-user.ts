import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";

export enum UserRole {
    ADMIN = 0,
    OFFICE_WORKER = 1,
    PHYSICAL_WORKER = 2
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
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

    id: string;  // izbrisati posle kad se poveze mongoose
}
