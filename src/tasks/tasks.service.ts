import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksDto } from 'src/tasks/dto/get-tasks.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { TasksStatusEnum } from 'src/tasks/task-status.enum';
import { Task } from 'src/tasks/task.entity';
import { TaskRepository } from 'src/tasks/task.repository';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTasks(filterDto: GetTasksDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
        const task = await this.getTaskById(id);
        task.status = updateTaskDto?.status ?? task.status;
        await this.taskRepository.save(task);
        return task;
    }
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }
    async deleteTask(id: string): Promise<void> {
        const deletedTask = await this.taskRepository.delete(id);

        if (deletedTask.affected !== 1) {
            throw new NotFoundException();
        }
        return;
    }
}
