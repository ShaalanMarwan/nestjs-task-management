import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
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

  updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const { status } = updateTaskDto;
    const tasks = [...this.tasks];
    const updatedIndex = this.tasks.findIndex((task) => task.id === id);
    tasks[updatedIndex].status = status;
    this.tasks = tasks;
    return tasks[updatedIndex];
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
    this.tasks = this.tasks.filter((task) => task.id !== id);
    // const deletedIndex = this.tasks.findIndex((task) => task.id === id);
    // // if (deletedIndex === -1) {
    // //   throw new Error('not found');
    // // }
    // this.tasks.splice(deletedIndex, 1);
  }
}
