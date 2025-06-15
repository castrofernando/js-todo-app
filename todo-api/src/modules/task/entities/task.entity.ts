import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document{
  
  @Prop({ required: true, minlength: 3 })
  description: string;

  @Prop({ required: true})
  done: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);