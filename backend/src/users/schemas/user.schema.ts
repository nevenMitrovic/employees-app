import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "../dto/create-user";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    role: UserRole;

    @Prop({ default: 0 })
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