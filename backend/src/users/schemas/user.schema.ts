import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "../dto/create-user";

@Schema({
    timestamps: true
})
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: UserRole;

    @Prop()
    experience: number;

    @Prop()
    benefits: boolean;

    @Prop()
    drink: boolean;

    @Prop()
    coefficient: number;

    @Prop()
    started: string;

    @Prop()
    perHour: number;
}

export const UserSchema = SchemaFactory.createForClass(User)