import { Controller, Get, Post } from '@nestjs/common';
import { Task } from 'src/tasks/task.model';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('')
  getTasks(): Task[] {
    return this.tasksService.getTasks();
  }
}
