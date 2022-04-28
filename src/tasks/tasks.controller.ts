import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { Task } from 'src/tasks/task.model';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('')
  getTasks(): Task[] {
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
}
