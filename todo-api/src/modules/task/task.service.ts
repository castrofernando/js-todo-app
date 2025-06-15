import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';


@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name)
    readonly taskModel: Model<Task>){

  }
  async create(createTaskDto: CreateTaskDto) {
    return await this.taskModel.create(createTaskDto);
  }

  async findAll() {
    return await this.taskModel.find();
  }

  async findOne(id:string) {
    const task = await this.taskModel.findById(id);
    if(!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
      runValidators: true
    });
    if(!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async replace(id:string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findOneAndReplace({_id: id}, updateTaskDto, {
      new: true,
      runValidators: true
    });
    if(!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);
    if(!task) {
      throw new NotFoundException('Task not found');
    }
  }
}