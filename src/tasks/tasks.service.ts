import { Injectable, NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksDto } from 'src/tasks/dto/get-tasks.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task, TasksStatusEnum } from 'src/tasks/task.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(filterDto: GetTasksDto): Task[] {
    const { status, q } = filterDto;
    let tasks = this.tasks;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (q) {
      tasks = tasks.filter(
        (task) => task.title.includes(q) || task.description.includes(q),
      );
    }

    return tasks;
  }

  // getTasks(getTasksDto: GetTasksDto): Task[] {
  //   const { q, status } = getTasksDto;

  //   return this.tasks.filter(
  //     (task) =>
  //       (status !== undefined &&
  //         task.status === status &&
  //         q !== undefined &&
  //         task.description.includes(q)) ||
  //       task.title.includes(q),
  //   );
  // }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
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
      status: TasksStatusEnum.OPEN,
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
