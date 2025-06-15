import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Logger, Req, Put, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { plainToInstance } from 'class-transformer';
import { ReadTaskDto } from './dto/read-task.dto';

@Controller('task')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);
  
  constructor(private readonly taskService: TaskService) {}
  
  @Post()
  @HttpCode(201)
  async create(@Req() request:Request, @Body() createTaskDto: CreateTaskDto) {
    this.logger.debug(`Request: ${request.method} - ${request.url} body: ${JSON.stringify(request.body)}`);
    return plainToInstance(ReadTaskDto, await this.taskService.create(createTaskDto), {excludeExtraneousValues:true});
  }

  @Get()
  async findAll(@Req() request: Request) {
    this.logger.debug(`Request: ${request.method} - ${request.url}`);
    return plainToInstance(ReadTaskDto, await this.taskService.findAll(), {excludeExtraneousValues:true});
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    this.logger.debug(`Request: ${request.method} - ${request.url}`);
    return plainToInstance(ReadTaskDto, await this.taskService.findOne(id), {excludeExtraneousValues:true});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() request:Request) {
    this.logger.debug(`Request: ${request.method} - ${request.url} body: ${JSON.stringify(request.body)}`);
    return plainToInstance(ReadTaskDto, await this.taskService.update(id, updateTaskDto), {excludeExtraneousValues:true});
  }

  @Put(':id')
  async replace(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() request:Request) {
    this.logger.debug(`Request: ${request.method} - ${request.url} body: ${JSON.stringify(request.body)}`);
    return plainToInstance(ReadTaskDto, await this.taskService.update(id, updateTaskDto), {excludeExtraneousValues:true});
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Req() request:Request) {
    this.logger.debug(`Request: ${request.method} - ${request.url}`);
    await this.taskService.remove(id);
  }
}
