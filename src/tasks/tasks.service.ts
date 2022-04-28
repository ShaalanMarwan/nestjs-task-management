import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { Task, TasksEnum } from 'src/tasks/task.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TasksEnum.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): void {
    const deletedIndex = this.tasks.findIndex((task) => task.id === id);
    // if (deletedIndex === -1) {
    //   throw new Error('not found');
    // }
    this.tasks.splice(deletedIndex, 1);
  }
}
