import { Controller, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Post('')
  createTask() {
    return true;
  }
}
