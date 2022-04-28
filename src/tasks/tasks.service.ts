import { Injectable } from '@nestjs/common';
import { Task, TasksEnum } from 'src/tasks/task.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TasksEnum.IN_PROGRESS,
    };
    this.tasks.push(task);
    return task;
  }
}
